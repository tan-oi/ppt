"use client";

import React, { useState } from "react";
import { Check, Sparkles, Zap, Crown } from "lucide-react";

const PricingPage = () => {
  const [loading, setLoading] = useState<string | null>(null);

  const handleUpgrade = async (plan: "basic" | "pro") => {
    setLoading(plan);

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key: plan }),
      });

      const data = await response.json();

      if (data.checkout_url) {
        window.location.href = data.checkout_url;
      } else {
        console.log(data);
        alert("Failed to create checkout session");
        setLoading(null);
      }
    } catch (error) {
      console.error("Checkout error:", error);
      alert("Something went wrong. Please try again.");
      setLoading(null);
    }
  };

  const plans = [
    {
      name: "Free",
      price: "$0",
      period: "forever",
      credits: 25,
      icon: Sparkles,
      features: [
        "25 presentation credits",
        "Basic templates",
        "Standard AI generation",
        "Export to PowerPoint",
        "Community support",
      ],
      cta: "Current Plan",
      highlighted: false,
      disabled: true,
    },
    {
      name: "Basic",
      price: "$15",
      period: "per month",
      credits: 80,
      icon: Zap,
      features: [
        "80 presentation credits/month",
        "Premium templates",
        "Priority AI generation",
        "Advanced customization",
        "Export to PowerPoint & PDF",
        "Email support",
      ],
      cta: "Upgrade to Basic",
      highlighted: false,
      planKey: "basic" as const,
    },
    {
      name: "Pro",
      price: "$39",
      period: "per month",
      credits: 300,
      icon: Crown,
      features: [
        "300 presentation credits/month",
        "All premium templates",
        "Fastest AI generation",
        "Custom branding",
        "Unlimited exports",
        "Priority support",
        "API access (coming soon)",
        "Team collaboration (coming soon)",
      ],
      cta: "Upgrade to Pro",
      highlighted: true,
      planKey: "pro" as const,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950 py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block mb-4 px-4 py-2 rounded-full bg-neutral-800/40 border border-neutral-700/60">
            <p className="text-xs font-medium text-neutral-400 tracking-widest uppercase">
              Pricing
            </p>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Choose Your Plan
          </h1>
          <p className="text-xl text-neutral-400 max-w-2xl mx-auto">
            Start free, upgrade when you need more. All plans include access to
            our AI-powered presentation generator.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan) => {
            const Icon = plan.icon;
            return (
              <div
                key={plan.name}
                className={`relative rounded-2xl p-8 backdrop-blur-xl transition-all duration-300 hover:scale-105 ${
                  plan.highlighted
                    ? "bg-gradient-to-b from-blue-900/40 to-neutral-900/40 border-2 border-blue-500/50 shadow-2xl shadow-blue-500/20"
                    : "bg-neutral-900/40 border border-neutral-800/60"
                }`}
              >
                {plan.highlighted && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-blue-500 rounded-full text-xs font-bold text-white">
                    MOST POPULAR
                  </div>
                )}

                {/* Icon */}
                <div
                  className={`inline-flex p-3 rounded-xl mb-4 ${
                    plan.highlighted ? "bg-blue-500/20" : "bg-neutral-800/40"
                  }`}
                >
                  <Icon
                    className={`w-6 h-6 ${
                      plan.highlighted ? "text-blue-400" : "text-neutral-400"
                    }`}
                  />
                </div>

                {/* Plan Name */}
                <h3 className="text-2xl font-bold text-white mb-2">
                  {plan.name}
                </h3>

                {/* Price */}
                <div className="mb-6">
                  <span className="text-5xl font-bold text-white">
                    {plan.price}
                  </span>
                  <span className="text-neutral-400 ml-2">{plan.period}</span>
                </div>

                {/* Credits */}
                <div className="mb-6 p-3 rounded-lg bg-neutral-800/40 border border-neutral-700/40">
                  <p className="text-sm text-neutral-400">
                    <span className="text-2xl font-bold text-white">
                      {plan.credits}
                    </span>{" "}
                    presentations/month
                  </p>
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                      <span className="text-neutral-300 text-sm">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <button
                  onClick={() => plan.planKey && handleUpgrade(plan.planKey)}
                  disabled={plan.disabled || loading !== null}
                  className={`w-full py-3 px-6 rounded-xl font-semibold transition-all duration-200 ${
                    plan.disabled
                      ? "bg-neutral-800 text-neutral-500 cursor-not-allowed"
                      : plan.highlighted
                      ? "bg-blue-500 text-white hover:bg-blue-600 shadow-lg shadow-blue-500/30"
                      : "bg-neutral-700 text-white hover:bg-neutral-600"
                  } ${loading === plan.planKey ? "opacity-50" : ""}`}
                >
                  {loading === plan.planKey ? "Loading..." : plan.cta}
                </button>
              </div>
            );
          })}
        </div>

        {/* FAQ or Additional Info */}
        <div className="mt-20 text-center">
          <p className="text-neutral-400 mb-4">
            Have questions? Check out our{" "}
            <a
              href="/faq"
              className="text-blue-400 hover:text-blue-300 underline"
            >
              FAQ
            </a>{" "}
            or{" "}
            <a
              href="/contact"
              className="text-blue-400 hover:text-blue-300 underline"
            >
              contact support
            </a>
          </p>
          <p className="text-sm text-neutral-500">
            All plans include secure payments via Dodo Payments. Cancel anytime.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PricingPage;
