import { prisma } from "@/lib/prisma";
import { Webhooks } from "@dodopayments/nextjs";
import { CurrentPlan } from "@prisma/client";

const PLAN_CONFIG = {
  free: { credits: 25, tier: 0 },
  basic: { credits: 80, tier: 1 },
  pro: { credits: 300, tier: 2 },
} as const;

type Plan = keyof typeof PLAN_CONFIG;

export const POST = Webhooks({
  webhookKey: process.env.DODO_PAYMENTS_WEBHOOK_SECRET!,
  onPaymentSucceeded: async (payload) => {
    try {
      const data = payload.data;
      const meta = data.metadata;
      console.log(data);
      if (!meta?.uid || !meta?.plan) {
        console.error("Missing metadata", {
          paymentId: data.payment_id,
          meta,
        });
        return;
      }

      const uid = meta.uid;
      const plan = meta.plan as Plan;
      const paymentId = data.payment_id;

      const existingPayment = await prisma.payment.findUnique({
        where: { paymentId },
      });

      if (existingPayment) {
        console.log(" Payment already processed, skipping", { paymentId });
        return;
      }

      const user = await prisma.user.findUnique({
        where: { id: uid },
      });

      if (!user) {
        console.error(" User not found", { uid, paymentId });
        throw new Error(`User not found: ${uid}`);
      }

      const prevPlan = (user.current_plan || "free") as Plan;
      const prevCredits = user.credits ?? 0;

      let newCredits: number;
      let creditAction: string;

      const prevTier = PLAN_CONFIG[prevPlan].tier;
      const newTier = PLAN_CONFIG[plan].tier;

      if (newTier > prevTier) {
        newCredits = prevCredits + PLAN_CONFIG[plan].credits;
        creditAction = ` Upgrade: ${prevCredits} + ${PLAN_CONFIG[plan].credits} = ${newCredits}`;
      } else {
        newCredits = PLAN_CONFIG[plan].credits;
        creditAction = `${
          newTier === prevTier ? "Renewal" : "Downgrade"
        }: Reset to ${newCredits}`;
      }

      const creditsAdded = newCredits - prevCredits;

      await prisma.$transaction([
        prisma.user.update({
          where: { id: uid },
          data: {
            credits: newCredits,
            current_plan: plan as CurrentPlan,
            current_plan_start: new Date(),
            subscription_id: data.subscription_id || null,
          },
        }),

        prisma.payment.create({
          data: {
            paymentId: paymentId,
            userId: uid,
            subscription_id: data.subscription_id || null,
            plan: plan as CurrentPlan,
            creditsAdded: creditsAdded,
            amount: data.total_amount || 0,
            currency: data.currency || "USD",
            status: "succeeded",
          },
        }),
      ]);

      console.log("Payment processed successfully", {
        userId: uid,
        paymentId,
        plan,
        prevPlan,
        prevCredits,
        newCredits,
        creditsAdded,
        action: creditAction,
      });
    } catch (error) {
      console.error(" Payment webhook error:", error);
      throw error;
    }
  },

  onSubscriptionRenewed: async (payload) => {
    try {
      const data = payload.data;
      const meta = data.metadata;

      if (!meta?.uid || !meta?.plan) {
        console.error(" Missing metadata in renewal", {
          subscriptionId: data.subscription_id,
          meta,
        });
        return;
      }

      const uid = meta.uid;
      const plan = meta.plan as Plan;

      const user = await prisma.user.findUnique({
        where: { id: uid },
      });

      if (!user) return;

      if (user.current_plan !== plan) return;

      await prisma.user.update({
        where: { id: uid },
        data: {
          credits: PLAN_CONFIG[plan].credits,
          current_plan_start: new Date(),
        },
      });

      console.log(" Subscription renewed", {
        userId: uid,
        plan,
        creditsReset: PLAN_CONFIG[plan].credits,
      });
    } catch (error) {
      console.error(" Renewal webhook error:", error);
      throw error;
    }
  },

  onSubscriptionCancelled: async (payload) => {
    try {
      const data = payload.data;
      const meta = data.metadata;

      if (!meta?.uid) {
        console.error("Missing uid in cancellation", {
          subscriptionId: data.subscription_id,
          meta,
        });
        return;
      }

      const uid = meta.uid;

      await prisma.user.update({
        where: { id: uid },
        data: {
          current_plan: "free" as CurrentPlan,
          credits: PLAN_CONFIG.free.credits,
          subscription_id: null,
          current_plan_start: new Date(),
        },
      });

      console.log(" Subscription cancelled", { userId: uid });
    } catch (error) {
      console.error(" Cancellation webhook error:", error);
      throw error;
    }
  },

  onSubscriptionExpired: async (payload) => {
    try {
      const data = payload.data;
      const meta = data.metadata;

      if (!meta?.uid) {
        console.error(" Missing uid in expiration", {
          subscriptionId: data.subscription_id,
          meta,
        });
        return;
      }

      const uid = meta.uid;

      await prisma.user.update({
        where: { id: uid },
        data: {
          current_plan: "free" as CurrentPlan,
          credits: PLAN_CONFIG.free.credits,
          subscription_id: null,
          current_plan_start: new Date(),
        },
      });

      console.log(" Subscription expired", { userId: uid });
    } catch (error) {
      console.error(" Expiration webhook error:", error);
      throw error;
    }
  },

  onRefundSucceeded: async (payload) => {
    try {
      const data = payload.data;
      const paymentId = data.payment_id;

      const payment = await prisma.payment.findUnique({
        where: { paymentId },
        include: { user: true },
      });

      if (!payment) {
        console.error(" Payment not found for refund", { paymentId });
        return;
      }
      const newCredits = Math.max(
        0,
        payment.user.credits - payment.creditsAdded
      );

      await prisma.$transaction([
        prisma.user.update({
          where: { id: payment.userId },
          data: {
            credits: newCredits,
            current_plan: "free" as CurrentPlan,
            subscription_id: null,
          },
        }),

        prisma.payment.update({
          where: { paymentId },
          data: { status: "refunded" },
        }),
      ]);

      console.log(" Refund processed", {
        userId: payment.userId,
        creditsRemoved: payment.creditsAdded,
        newCredits,
      });
    } catch (error) {
      console.error("Refund webhook error:", error);
      throw error;
    }
  },

  onPaymentFailed: async (payload) => {
    const data = payload.data;
    const meta = data.metadata;

    console.log(" Payment failed", {
      userId: meta?.uid,
      paymentId: data.payment_id,
    });
  },
});
