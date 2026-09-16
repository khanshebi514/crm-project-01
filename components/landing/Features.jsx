"use client";

import { motion } from "framer-motion";

const features = [
  {
    title: "Product Management",
    description:
      "Manage thousands of products with categories, units, pricing and barcode support.",
    icon: "📦",
  },

  {
    title: "Smart Inventory",
    description:
      "Track your stock levels, manage quantities and avoid unexpected shortages.",
    icon: "📊",
  },

  {
    title: "Sales Management",
    description:
      "Record sales, manage transactions and keep your business organised.",
    icon: "🧾",
  },

  {
    title: "Purchase Management",
    description:
      "Manage suppliers, purchases and automatically maintain stock records.",
    icon: "🚚",
  },

  {
    title: "Excel Import & Export",
    description:
      "Upload hundreds of products instantly using Excel or CSV files.",
    icon: "📥",
  },

  {
    title: "Business Reports",
    description:
      "Understand your business performance with meaningful insights.",
    icon: "📈",
  },
];

export default function Features() {
  return (
    <section
      id="features"
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
        <motion.div
          initial={{
            opacity: 0,
            y: 30,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
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
            Everything Your Business Needs
          </h2>

          <p
            className="
mt-4
text-text-secondary
"
          >
            SAI combines essential business tools into one simple platform.
          </p>
        </motion.div>

        <div
          className="
mt-12
grid
gap-6
md:grid-cols-2
lg:grid-cols-3
"
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{
                opacity: 0,
                y: 40,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: index * 0.1,
              }}
              viewport={{
                once: true,
              }}
              whileHover={{
                scale: 1.03,
              }}
              className="
rounded-xl
border
bg-surface
p-6
shadow-sm
"
            >
              <div
                className="
text-3xl
"
              >
                {feature.icon}
              </div>

              <h3
                className="
mt-4
font-semibold
text-lg
"
              >
                {feature.title}
              </h3>

              <p
                className="
mt-2
text-sm
text-text-secondary
"
              >
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
