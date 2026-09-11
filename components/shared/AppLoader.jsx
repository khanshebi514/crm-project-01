"use client";

import { motion } from "framer-motion";

export default function AppLoader({ message = "Loading..." }) {
  return (
    <div
      className="
      flex
      min-h-screen
      flex-col
      items-center
      justify-center
      bg-surface-secondary
      "
    >
      {/* Logo animation */}

      <motion.div
        initial={{
          opacity: 0,
          scale: 0.8,
        }}
        animate={{
          opacity: 1,
          scale: 1,
        }}
        transition={{
          duration: 0.5,
        }}
        className="
        text-4xl
        font-bold
        text-primary
        "
      >
        SAI
      </motion.div>

      <motion.p
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          delay: 0.3,
        }}
        className="
        mt-4
        text-sm
        text-text-secondary
        "
      >
        {message}
      </motion.p>

      {/* Progress bar */}

      <div
        className="
        mt-6
        h-2
        w-64
        overflow-hidden
        rounded-full
        bg-surface-muted
        "
      >
        <motion.div
          initial={{
            x: "-100%",
          }}
          animate={{
            x: "100%",
          }}
          transition={{
            repeat: Infinity,

            duration: 1.4,

            ease: "linear",
          }}
          className="
          h-full
          w-1/2
          rounded-full
          bg-primary
          "
        />
      </div>

      <motion.div
        animate={{
          opacity: [0.4, 1, 0.4],
        }}
        transition={{
          repeat: Infinity,
          duration: 1.5,
        }}
        className="
        mt-3
        text-xs
        text-text-secondary
        "
      >
        Preparing your workspace...
      </motion.div>
    </div>
  );
}
