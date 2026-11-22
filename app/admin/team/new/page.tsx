import type { Metadata } from "next";
import { TeamForm } from "@/components/admin/forms";
import { AdminShell } from "@/components/admin/shell";
import { requireAdmin } from "@/lib/admin/auth";

export const metadata: Metadata = { title: "Add team member" };

export default async function NewMemberPage() {
  await requireAdmin();
  return (
    <AdminShell title="Add team member" description="Fill in the details below. The new member appears at the end of the Team page; you can reorder later." current="/admin/team" back={{ href: "/admin/team", label: "All team members" }}>
      <TeamForm />
    </AdminShell>
  );
}
