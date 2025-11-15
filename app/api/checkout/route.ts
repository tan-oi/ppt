import { NextRequest } from "next/server";
import { Checkout } from "@dodopayments/nextjs";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const CATALOG = {
  basic: {
    product_id: "pdt_1KldMAlGlukQ78FNh7rFN",
    quantity: 1,
  },
  pro: {
    product_id: "pdt_uXNAJbNql3Rzlt23MWN6C",
    quantity: 1,
  },
} as const;

type Plan = keyof typeof CATALOG;

const dodo = Checkout({
  bearerToken: process.env.DODO_PAYMENTS_API_KEY,
  returnUrl:
    process.env.DODO_PAYMENTS_RETURN_URL ||
    "http://localhost:3000/checkout/success",
  environment: process.env.DODO_PAYMENTS_ENVIRONMENT as
    | "test_mode"
    | "live_mode",
  type: "session",
});

export async function POST(req: NextRequest) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session)
    return new Response(JSON.stringify({ error: "invalid_user" }), {
      status: 400,
    });
  const body = await req.json();

  const plan = body.key as Plan;
  const product = CATALOG[plan];
  console.log(product);
  if (!product) {
    return new Response(JSON.stringify({ error: "invalid_plan" }), {
      status: 400,
    });
  }
  console.log(plan);
  // console.log(session);
  const safeBody = {
    product_cart: [product],
    customer: {
      email: session.user.email,
      name: session.user.name,
    },
    metadata: {
      uid: session.user.id,
      email: session.user.email,
      plan,
    },
    return_url:
      process.env.DODO_PAYMENTS_RETURN_URL ||
      "http://localhost:3000/checkout/success",
  };

  const newReq = new Request(req.url, {
    method: "POST",
    headers: req.headers,
    body: JSON.stringify(safeBody),
  });

  return dodo(newReq as any);
}
