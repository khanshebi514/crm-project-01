"use client";

import { motion } from "framer-motion";

const points = [
  "Designed for shop owners",

  "Simple and easy setup",

  "Cloud based business management",

  "Save time with automation",

  "Secure and organised data",
];

export default function WhySAI() {
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
max-w-5xl
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
          Why Choose SAI?
        </h2>

        <div
          className="
mt-10
grid
gap-4
md:grid-cols-5
"
        >
          {points.map((item, index) => (
            <motion.div
              key={item}
              initial={{
                opacity: 0,
                y: 20,
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
              className="
rounded-xl
border
bg-background
p-5
text-sm
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
