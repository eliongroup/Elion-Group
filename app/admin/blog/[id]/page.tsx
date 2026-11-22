import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PostForm } from "@/components/admin/forms";
import { AdminShell } from "@/components/admin/shell";
import { requireAdmin } from "@/lib/admin/auth";
import { readPosts } from "@/lib/cms/data";

export const metadata: Metadata = { title: "Edit article" };

export default async function EditPostPage({ params }: PageProps<"/admin/blog/[id]">) {
  await requireAdmin();
  const { id } = await params;
  const post = (await readPosts()).find((p) => p.id === id);
  if (!post) notFound();
  return (
    <AdminShell title="Edit article" description={post.title} current="/admin/blog" back={{ href: "/admin/blog", label: "All articles" }}>
      <PostForm post={post} today={new Date().toISOString().slice(0, 10)} />
    </AdminShell>
  );
}
