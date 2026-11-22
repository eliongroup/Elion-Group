import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { TeamForm } from "@/components/admin/forms";
import { AdminShell } from "@/components/admin/shell";
import { requireAdmin } from "@/lib/admin/auth";
import { readTeam } from "@/lib/cms/data";

export const metadata: Metadata = { title: "Edit team member" };

export default async function EditMemberPage({ params }: PageProps<"/admin/team/[id]">) {
  await requireAdmin();
  const { id } = await params;
  const member = (await readTeam()).find((m) => m.id === id);
  if (!member) notFound();
  return (
    <AdminShell title={member.name} description="Update the photo, role or biography. Changes go live when you save." current="/admin/team" back={{ href: "/admin/team", label: "All team members" }}>
      <TeamForm member={member} />
    </AdminShell>
  );
}
