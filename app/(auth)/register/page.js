import RegisterForm from "@/components/auth/RegisterForm";

export default function RegisterPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4">
      <section className="w-full max-w-md">
        <div className="sai-card">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-text-primary">
              Create SAI Account
            </h1>

            <p className="mt-2 text-sm text-text-secondary">
              Start managing your business today
            </p>
          </div>

          <RegisterForm />
        </div>

        <p className="mt-6 text-center text-sm text-text-secondary">
          Already have an account?
          <a
            href="/login"
            className="ml-1 font-medium text-primary hover:text-primary-hover"
          >
            Sign in
          </a>
        </p>
      </section>
    </main>
  );
}
