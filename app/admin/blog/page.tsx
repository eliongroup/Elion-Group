import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { deletePost } from "@/app/admin/actions";
import { ConfirmButton } from "@/components/admin/forms";
import { AdminShell } from "@/components/admin/shell";
import { Badge, EmptyState, Icon, Notice, buttonIcon, buttonPrimary } from "@/components/admin/ui";
import { requireAdmin } from "@/lib/admin/auth";
import { formatDate, readPosts, sortPosts } from "@/lib/cms/data";

export const metadata: Metadata = { title: "Blog" };

const filters = [
  { value: "all", label: "All" },
  { value: "published", label: "Published" },
  { value: "draft", label: "Drafts" },
] as const;

export default async function AdminBlogPage({ searchParams }: PageProps<"/admin/blog">) {
  await requireAdmin();
  const [posts, query] = await Promise.all([readPosts(), searchParams]);
  const status = filters.some((f) => f.value === query.status) ? (query.status as string) : "all";
  const shown = sortPosts(posts).filter((p) => status === "all" || p.status === status);
  const count = (v: string) => (v === "all" ? posts.length : posts.filter((p) => p.status === v).length);

  const add = (
    <Link href="/admin/blog/new" className={buttonPrimary}>
      <Icon name="plus" className="size-4" /> New article
    </Link>
  );

  return (
    <AdminShell
      title="Blog articles"
      description="Write news and insights. Drafts stay here until you publish them."
      current="/admin/blog"
      actions={posts.length > 0 ? add : undefined}
    >
      {query.saved && <Notice>Article saved.</Notice>}
      {query.deleted && <Notice>Article deleted.</Notice>}
      {posts.length === 0 ? (
        <EmptyState text="No articles yet. Write the first one; it stays a draft until you publish it." action={add} />
      ) : (
        <>
          <nav aria-label="Filter articles" className="mb-5 flex flex-wrap gap-2">
            {filters.map((f) => (
              <Link
                key={f.value}
                href={f.value === "all" ? "/admin/blog" : `/admin/blog?status=${f.value}`}
                aria-current={status === f.value ? "page" : undefined}
                className={`label inline-flex min-h-9 items-center gap-2 border px-4 text-[0.625rem] ${status === f.value ? "border-ink bg-ink text-ivory" : "border-line bg-white text-ink hover:border-ink"}`}
              >
                {f.label}
                <span className="tabular-nums opacity-60">{count(f.value)}</span>
              </Link>
            ))}
          </nav>

          {shown.length === 0 ? (
            <EmptyState text="Nothing here with this filter." action={<Link href="/admin/blog" className="label text-[0.625rem] text-gold-ink underline">Show all articles</Link>} />
          ) : (
            <ul className="divide-y divide-line border border-line bg-white">
              {shown.map((p) => (
                <li key={p.id} className="flex flex-wrap items-center gap-5 p-4 sm:p-5">
                  <Link href={`/admin/blog/${p.id}`} className="relative aspect-[3/2] w-24 shrink-0 overflow-hidden bg-ivory-deep">
                    {p.coverUrl ? (
                      <Image src={p.coverUrl} alt="" fill sizes="96px" quality={60} className="object-cover" />
                    ) : (
                      <span className="absolute inset-0 flex items-center justify-center text-muted">
                        <Icon name="blog" />
                      </span>
                    )}
                  </Link>
                  <div className="min-w-0 flex-1">
                    <Link href={`/admin/blog/${p.id}`} className="font-serif text-[1.1875rem] text-ink hover:text-gold-ink">
                      {p.title}
                    </Link>
                    <p className="mt-1 text-[0.8125rem] text-muted">
                      {formatDate(p.date)}
                      {p.category && ` · ${p.category}`} · /blog/{p.slug}
                    </p>
                  </div>
                  <Badge tone={p.status === "published" ? "gold" : "neutral"}>{p.status === "published" ? "Published" : "Draft"}</Badge>
                  <div className="flex items-center gap-2">
                    {p.status === "published" && (
                      <a href={`/blog/${p.slug}`} target="_blank" rel="noopener noreferrer" className={buttonIcon} title="View on the website">
                        <Icon name="eye" className="size-4" />
                        <span className="sr-only">View {p.title} on the website</span>
                      </a>
                    )}
                    <Link href={`/admin/blog/${p.id}`} className="label inline-flex min-h-9 items-center gap-2 bg-ink px-4 text-[0.625rem] text-ivory hover:bg-gold-ink">
                      <Icon name="edit" className="size-4" /> Edit
                    </Link>
                    <form action={deletePost}>
                      <input type="hidden" name="id" value={p.id} />
                      <ConfirmButton message={`Delete "${p.title}"? This cannot be undone.`} className={`${buttonIcon} text-red-800 hover:border-red-800`}>
                        <Icon name="trash" className="size-4" />
                        <span className="sr-only">Delete {p.title}</span>
                      </ConfirmButton>
                    </form>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </AdminShell>
  );
}
