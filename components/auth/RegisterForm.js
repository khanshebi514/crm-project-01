"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterForm() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    tenantName: "",
  });

  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);

  function update(field, value) {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  }

  async function submit(e) {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Registration failed");
      }

      router.push("/dashboard");

      router.refresh();
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={submit} className="space-y-5">
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

      {[
        ["name", "Full Name"],
        ["tenantName", "Business Name"],
        ["email", "Email"],
        ["password", "Password"],
      ].map(([field, label]) => (
        <div key={field}>
          <label
            className="
mb-2
block
text-sm
font-medium
text-text-primary
"
          >
            {label}
          </label>

          <input
            type={
              field === "password"
                ? "password"
                : field === "email"
                  ? "email"
                  : "text"
            }
            value={form[field]}
            onChange={(e) => update(field, e.target.value)}
            required
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
          />
        </div>
      ))}

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
        {loading ? "Creating Account..." : "Create Account"}
      </button>
    </form>
  );
}
