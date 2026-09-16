"use client";

import { useState } from "react";

import { motion } from "framer-motion";

import { pricingPlans } from "@/lib/pricing/pricing-config";

export default function PricingPreview() {
  const [yearly, setYearly] = useState(false);

  return (
    <section
      className="
py-20
"
    >
      <div
        className="
mx-auto
max-w-7xl
px-6
"
      >
        <div
          className="
text-center
"
        >
          <h2
            className="
text-3xl
font-bold
md:text-4xl
"
          >
            Simple Pricing For Every Business
          </h2>

          <p
            className="
mt-4
text-text-secondary
"
          >
            Choose a plan that grows with your business.
          </p>

          <div
            className="
mt-6
inline-flex
rounded-lg
border
p-1
"
          >
            <button
              onClick={() => setYearly(false)}
              className={`
px-4
py-2
rounded-md
${!yearly ? "bg-primary text-white" : ""}
`}
            >
              Monthly
            </button>

            <button
              onClick={() => setYearly(true)}
              className={`
px-4
py-2
rounded-md
${yearly ? "bg-primary text-white" : ""}
`}
            >
              Yearly
            </button>
          </div>
        </div>

        <div
          className="
mt-12
grid
gap-6
md:grid-cols-2
"
        >
          {Object.values(pricingPlans).map((plan) => (
            <motion.div
              key={plan.name}
              whileHover={{
                scale: 1.03,
              }}
              className="
rounded-xl
border
bg-surface
p-6
"
            >
              <h3
                className="
text-xl
font-semibold
"
              >
                {plan.name}
              </h3>

              <p
                className="
mt-2
text-sm
text-text-secondary
"
              >
                {plan.description}
              </p>

              <div
                className="
mt-6
text-3xl
font-bold
"
              >
                ₨ {yearly ? plan.pakistan.yearly : plan.pakistan.monthly}
                <span
                  className="
text-sm
font-normal
text-text-secondary
"
                >
                  /{yearly ? "year" : "month"}
                </span>
              </div>

              <ul
                className="
mt-6
space-y-2
text-sm
"
              >
                {plan.features.map((feature) => (
                  <li key={feature}>✓ {feature}</li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
