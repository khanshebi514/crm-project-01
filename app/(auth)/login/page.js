import LoginForm from "@/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4">
      <section className="w-full max-w-md">
        <div className="sai-card">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-text-primary">SAI</h1>

            <p className="mt-2 text-sm text-text-secondary">
              Sign in to your business platform
            </p>
          </div>

          <LoginForm />
        </div>

        <p className="mt-6 text-center text-sm text-text-secondary">
          New business?
          <a
            href="/register"
            className="ml-1 font-medium text-primary hover:text-primary-hover"
          >
            Create account
          </a>
        </p>
      </section>
    </main>
  );
}
