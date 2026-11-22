import Image from "next/image";
import Link from "next/link";
import { AdminShell } from "@/components/admin/shell";
import { Badge, Icon, Notice, buttonPrimary, buttonSecondary, type IconName } from "@/components/admin/ui";
import { requireAdmin } from "@/lib/admin/auth";
import { formatDate, readPosts, readTeam, sortPosts } from "@/lib/cms/data";
import { storageStatus } from "@/lib/cms/storage";

export default async function AdminDashboard() {
  await requireAdmin();
  const [team, posts] = await Promise.all([readTeam(), readPosts()]);
  const published = posts.filter((p) => p.status === "published").length;
  const drafts = posts.length - published;
  const shown = team.filter((m) => m.visible).length;
  const storage = storageStatus();
  const recent = sortPosts(posts).slice(0, 5);

  const stats = [
    { label: "Team members", value: team.length, note: `${shown} shown on the site`, href: "/admin/team" },
    { label: "Published articles", value: published, note: "Live on the blog", href: "/admin/blog?status=published" },
    { label: "Drafts", value: drafts, note: drafts ? "Not yet public" : "Nothing waiting", href: "/admin/blog?status=draft" },
  ];

  const quick: { title: string; text: string; href: string; icon: IconName }[] = [
    { title: "Add a team member", text: "Name, role, short bio and portrait photo.", href: "/admin/team/new", icon: "team" },
    { title: "Write a blog article", text: "Save as a draft, publish when it is ready.", href: "/admin/blog/new", icon: "blog" },
    { title: "Reorder the team", text: "Change the order people appear on the Team page.", href: "/admin/team", icon: "up" },
  ];

  return (
    <AdminShell title="Welcome back" description="Manage the people and the articles shown on the ELION GROUP website." current="/admin">
      {storage === "missing" && (
        <Notice tone="warning">
          Saving is switched off: connect a Vercel Blob store to this project (Storage → Blob), then redeploy.
        </Notice>
      )}
      {storage === "local" && (
        <Notice>Local mode: changes are saved in the .data folder on this computer and do not reach the live website.</Notice>
      )}

      {/* Quick actions */}
      <section aria-labelledby="quick-title">
        <h2 id="quick-title" className="label mb-4 text-[0.625rem] text-muted">
          What would you like to do?
        </h2>
        <div className="grid gap-4 md:grid-cols-3">
          {quick.map((q) => (
            <Link key={q.title} href={q.href} className="group flex flex-col gap-4 border border-line bg-white p-6 transition-colors hover:border-gold">
              <span className="flex size-11 items-center justify-center bg-ivory-deep text-gold-ink transition-colors group-hover:bg-ink group-hover:text-ivory">
                <Icon name={q.icon} className="size-5" />
              </span>
              <span>
                <span className="block font-serif text-[1.25rem] text-ink">{q.title}</span>
                <span className="mt-1 block text-[0.875rem] text-muted">{q.text}</span>
              </span>
              <span className="label mt-auto inline-flex items-center gap-2 text-[0.625rem] text-gold-ink">
                Start <Icon name="arrow" className="size-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Numbers */}
      <section aria-label="Overview" className="mt-10 grid gap-4 sm:grid-cols-3">
        {stats.map((s) => (
          <Link key={s.label} href={s.href} className="border border-line bg-white p-6 transition-colors hover:border-ink">
            <p className="label text-[0.5625rem] text-muted">{s.label}</p>
            <p className="mt-3 font-serif text-[2.5rem] leading-none text-ink tabular-nums">{s.value}</p>
            <p className="mt-2 text-[0.8125rem] text-muted">{s.note}</p>
          </Link>
        ))}
      </section>

      <div className="mt-10 grid gap-6 xl:grid-cols-[1.4fr_1fr]">
        {/* Recent articles */}
        <section className="border border-line bg-white">
          <div className="flex items-center justify-between border-b border-line px-6 py-4">
            <h2 className="font-serif text-[1.25rem] text-ink">Latest articles</h2>
            <Link href="/admin/blog" className="label text-[0.625rem] text-gold-ink hover:underline">
              All articles →
            </Link>
          </div>
          {recent.length === 0 ? (
            <div className="flex flex-col items-start gap-4 p-6">
              <p className="text-muted">No articles yet.</p>
              <Link href="/admin/blog/new" className={buttonPrimary}>
                <Icon name="plus" className="size-4" /> Write the first article
              </Link>
            </div>
          ) : (
            <ul className="divide-y divide-line">
              {recent.map((p) => (
                <li key={p.id}>
                  <Link href={`/admin/blog/${p.id}`} className="flex items-center gap-4 px-6 py-4 hover:bg-ivory">
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-ink">{p.title}</span>
                      <span className="mt-0.5 block text-[0.8125rem] text-muted">{formatDate(p.date)}</span>
                    </span>
                    <Badge tone={p.status === "published" ? "gold" : "neutral"}>{p.status === "published" ? "Published" : "Draft"}</Badge>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </section>

        {/* Team preview */}
        <section className="border border-line bg-white">
          <div className="flex items-center justify-between border-b border-line px-6 py-4">
            <h2 className="font-serif text-[1.25rem] text-ink">Team</h2>
            <Link href="/admin/team" className="label text-[0.625rem] text-gold-ink hover:underline">
              Manage →
            </Link>
          </div>
          {team.length === 0 ? (
            <div className="flex flex-col items-start gap-4 p-6">
              <p className="text-muted">No team members yet.</p>
              <Link href="/admin/team/new" className={buttonPrimary}>
                <Icon name="plus" className="size-4" /> Add the first member
              </Link>
            </div>
          ) : (
            <ul className="divide-y divide-line">
              {team.slice(0, 6).map((m) => (
                <li key={m.id}>
                  <Link href={`/admin/team/${m.id}`} className="flex items-center gap-4 px-6 py-3 hover:bg-ivory">
                    <span className="relative size-10 shrink-0 overflow-hidden rounded-full bg-ivory-deep">
                      {m.photoUrl ? (
                        <Image src={m.photoUrl} alt="" fill sizes="40px" className="object-cover" />
                      ) : (
                        <span className="absolute inset-0 flex items-center justify-center font-serif text-gold-ink">{m.name.charAt(0)}</span>
                      )}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-ink">{m.name}</span>
                      <span className="block truncate text-[0.8125rem] text-muted">{m.role}</span>
                    </span>
                    {!m.visible && <Badge>Hidden</Badge>}
                  </Link>
                </li>
              ))}
            </ul>
          )}
          {team.length > 6 && (
            <p className="border-t border-line px-6 py-3 text-[0.8125rem] text-muted">and {team.length - 6} more</p>
          )}
          {team.length > 0 && (
            <div className="border-t border-line p-4">
              <Link href="/admin/team/new" className={`${buttonSecondary} w-full`}>
                <Icon name="plus" className="size-4" /> Add team member
              </Link>
            </div>
          )}
        </section>
      </div>
    </AdminShell>
  );
}
