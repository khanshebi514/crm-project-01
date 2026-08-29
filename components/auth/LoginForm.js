"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const router = useRouter();

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      /*
        Server decides destination:

        Admin     → /admin
        User      → /dashboard

        We will implement this
        endpoint next.
      */

      const sessionResponse = await fetch("/api/auth/session");

      const session = await sessionResponse.json();

      if (session.user) {
        router.push(session.isAdmin ? "/admin" : "/dashboard");
      } else {
        router.push("/dashboard");
      }

      router.refresh();
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {error && (
        <div
          className="
          rounded-md
          border
          border-danger
          bg-danger-background
          px-4
          py-3
          text-sm
          text-danger
        "
        >
          {error}
        </div>
      )}

      <div>
        <label
          className="
          mb-2
          block
          text-sm
          font-medium
          text-text-primary
        "
        >
          Email
        </label>

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="
            w-full
            rounded-md
            border
            border-input-border
            bg-input-background
            px-4
            py-3
            text-text-primary
            focus:outline-none
            focus:ring-2
            focus:ring-focus-ring
          "
          placeholder="you@example.com"
          required
        />
      </div>

      <div>
        <label
          className="
          mb-2
          block
          text-sm
          font-medium
          text-text-primary
        "
        >
          Password
        </label>

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="
            w-full
            rounded-md
            border
            border-input-border
            bg-input-background
            px-4
            py-3
            text-text-primary
            focus:outline-none
            focus:ring-2
            focus:ring-focus-ring
          "
          placeholder="********"
          required
        />
      </div>

      <button
        disabled={loading}
        className="
          w-full
          rounded-md
          bg-primary
          px-4
          py-3
          font-medium
          text-primary-foreground
          hover:bg-primary-hover
          disabled:opacity-50
        "
      >
        {loading ? "Signing in..." : "Sign In"}
      </button>
    </form>
  );
}
