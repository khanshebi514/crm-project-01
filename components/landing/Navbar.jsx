"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav
      className="
      w-full
      border-b
      border-border
      bg-background/80
      backdrop-blur
      "
    >
      <div
        className="
        mx-auto
        flex
        max-w-7xl
        items-center
        justify-between
        px-6
        py-4
        "
      >
        {/* Logo */}

        <Link
          href="/"
          className="
          text-2xl
          font-bold
          text-primary
          "
        >
          SAI
        </Link>

        {/* Navigation */}

        <div
          className="
          hidden
          md:flex
          items-center
          gap-8
          text-sm
          "
        >
          <Link
            href="#features"
            className="
            hover:text-primary
            "
          >
            Features
          </Link>

          <Link
            href="/pricing"
            className="
            hover:text-primary
            "
          >
            Pricing
          </Link>

          <Link
            href="#about"
            className="
            hover:text-primary
            "
          >
            About
          </Link>
        </div>

        {/* Actions */}

        <div
          className="
          flex
          items-center
          gap-3
          "
        >
          <Link
            href="/login"
            className="
            rounded-md
            px-4
            py-2
            text-sm
            "
          >
            Login
          </Link>

          <Link
            href="/register"
            className="
            rounded-md
            bg-primary
            px-4
            py-2
            text-sm
            text-primary-foreground
            "
          >
            Get Started
          </Link>
        </div>
      </div>
    </nav>
  );
}
