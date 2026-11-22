import type { Metadata } from "next";
import { PostForm } from "@/components/admin/forms";
import { AdminShell } from "@/components/admin/shell";
import { requireAdmin } from "@/lib/admin/auth";

export const metadata: Metadata = { title: "New article" };

export default async function NewPostPage() {
  await requireAdmin();
  return (
    <AdminShell title="New article" description="Write it, add a cover photo, then choose Draft or Published." current="/admin/blog" back={{ href: "/admin/blog", label: "All articles" }}>
      <PostForm today={new Date().toISOString().slice(0, 10)} />
    </AdminShell>
  );
}
