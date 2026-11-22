import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { LoginForm } from "@/components/admin/forms";
import { adminConfigured, isAdmin } from "@/lib/admin/auth";

export const metadata: Metadata = { title: "Sign in" };

export default async function LoginPage() {
  if (await isAdmin()) redirect("/admin");
  // Rendered per request (isAdmin reads the cookie), so this reflects the live environment.
  return (
    <main className="flex min-h-screen items-center justify-center px-5 py-16">
      <div className="w-full max-w-sm border border-line bg-white p-8 sm:p-10">
        <p className="font-serif text-lg tracking-[0.2em] text-ink">
          ELION <span className="text-gold-ink">ADMIN</span>
        </p>
        <h1 className="mt-8 font-serif text-[1.75rem] text-ink">Sign in</h1>
        <p className="mt-2 text-[0.9375rem] text-muted">Manage the team and the blog.</p>
        {!adminConfigured() && (
          <p className="mt-6 border-s-2 border-red-700 bg-red-50 px-4 py-3 text-[0.875rem] text-red-900">
            Not configured yet: set <code>ADMIN_PASSWORD</code> in the environment variables, then restart or redeploy.
          </p>
        )}
        <div className="mt-8">
          <LoginForm />
        </div>
      </div>
    </main>
  );
}
