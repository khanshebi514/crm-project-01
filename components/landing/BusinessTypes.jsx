"use client";

import { motion } from "framer-motion";

const businesses = [
  "🛒 Grocery Stores",

  "💊 Pharmacy",

  "💄 Cosmetics Shops",

  "🏪 Retail Stores",

  "📦 Wholesale Businesses",

  "🏢 Small Enterprises",
];

export default function BusinessTypes() {
  return (
    <section
      className="
bg-muted
py-20
"
    >
      <div
        className="
mx-auto
max-w-7xl
px-6
text-center
"
      >
        <h2
          className="
text-3xl
font-bold
"
        >
          Built For Every Growing Business
        </h2>

        <p
          className="
mt-4
text-text-secondary
"
        >
          Whether you run a small shop or a growing business, SAI helps you stay
          organised.
        </p>

        <div
          className="
mt-10
flex
flex-wrap
justify-center
gap-4
"
        >
          {businesses.map((item, index) => (
            <motion.div
              key={item}
              whileHover={{
                scale: 1.05,
              }}
              className="
rounded-full
border
bg-background
px-6
py-3
shadow-sm
"
            >
              {item}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
