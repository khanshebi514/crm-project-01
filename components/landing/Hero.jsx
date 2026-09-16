"use client";

import Link from "next/link";

import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section
      className="
      relative
      overflow-hidden
      "
    >
      <div
        className="
        mx-auto
        grid
        max-w-7xl
        gap-12
        px-6
        py-20
        md:grid-cols-2
        md:items-center
        "
      >
        {/* Left Content */}

        <motion.div
          initial={{
            opacity: 0,
            y: 30,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.6,
          }}
        >
          <h1
            className="
            text-4xl
            font-bold
            leading-tight
            md:text-6xl
            "
          >
            Manage Your Business
            <span
              className="
              text-primary
              "
            >
              {" "}
              Smarter
            </span>
            With SAI
          </h1>

          <p
            className="
            mt-6
            max-w-xl
            text-lg
            text-text-secondary
            "
          >
            SAI is a smart business management platform designed for shop owners
            to manage products, inventory, sales and daily operations from one
            simple dashboard.
          </p>

          <div
            className="
            mt-8
            flex
            gap-4
            "
          >
            <Link
              href="/register"
              className="
              rounded-lg
              bg-primary
              px-6
              py-3
              text-primary-foreground
              "
            >
              Start Free Trial
            </Link>

            <Link
              href="/login"
              className="
              rounded-lg
              border
              px-6
              py-3
              "
            >
              Login
            </Link>
          </div>

          <div
            className="
            mt-6
            flex
            gap-4
            text-sm
            text-text-secondary
            "
          >
            <span>✓ Easy Setup</span>

            <span>✓ Inventory Control</span>

            <span>✓ Excel Import</span>
          </div>
        </motion.div>

        {/* Right Dashboard Preview */}

        <motion.div
          initial={{
            opacity: 0,
            scale: 0.9,
          }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          transition={{
            duration: 0.7,
          }}
          className="
          relative
          "
        >
          <motion.div
            animate={{
              y: [0, -10, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
            }}
            className="
            rounded-2xl
            border
            bg-surface
            p-6
            shadow-xl
            "
          >
            <h3
              className="
              font-semibold
              "
            >
              SAI Dashboard
            </h3>

            <div
              className="
              mt-6
              grid
              gap-4
              "
            >
              <div className="rounded-lg border p-4">
                <p className="text-sm text-text-secondary">Products</p>

                <p className="text-2xl font-bold">1,250</p>
              </div>

              <div className="rounded-lg border p-4">
                <p className="text-sm text-text-secondary">Stock Status</p>

                <p className="text-2xl font-bold text-primary">Healthy</p>
              </div>

              <div className="rounded-lg border p-4">
                <p className="text-sm text-text-secondary">Today's Sales</p>

                <p className="text-2xl font-bold">Rs 45,000</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
