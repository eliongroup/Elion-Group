import Link from "next/link";
import { logout } from "@/app/admin/actions";
import { readPosts, readTeam } from "@/lib/cms/data";
import { Icon } from "./ui";

/* ---------------------------------------------------------------- Shell */

type Section = "/admin" | "/admin/team" | "/admin/blog";

function Brand() {
  return (
    <Link href="/admin" className="font-serif text-lg tracking-[0.2em] text-ivory">
      ELION <span className="text-gold-light">ADMIN</span>
    </Link>
  );
}

async function SidebarNav({ current }: { current: Section }) {
  const [team, posts] = await Promise.all([readTeam(), readPosts()]);
  const drafts = posts.filter((p) => p.status === "draft").length;

  const nav = [
    { href: "/admin" as const, label: "Dashboard", icon: "dashboard" as const, meta: undefined },
    { href: "/admin/team" as const, label: "Team members", icon: "team" as const, meta: String(team.length) },
    { href: "/admin/blog" as const, label: "Blog articles", icon: "blog" as const, meta: String(posts.length) },
  ];

  const item = "flex items-center gap-3 px-3 py-2.5 text-[0.9375rem] transition-colors";
  return (
    <div className="flex h-full flex-col gap-8">
      <div>
        <p className="label mb-3 px-3 text-[0.5625rem] text-ivory/45">Manage</p>
        <nav aria-label="Admin" className="space-y-1">
          {nav.map((n) => {
            const active = current === n.href;
            return (
              <Link
                key={n.href}
                href={n.href}
                aria-current={active ? "page" : undefined}
                className={`${item} ${active ? "bg-ivory/10 text-ivory shadow-[inset_2px_0_0_var(--color-gold)]" : "text-ivory/70 hover:bg-ivory/5 hover:text-ivory"}`}
              >
                <Icon name={n.icon} />
                <span className="flex-1">{n.label}</span>
                {n.meta && <span className="text-[0.75rem] tabular-nums text-ivory/50">{n.meta}</span>}
              </Link>
            );
          })}
        </nav>
      </div>

      <div>
        <p className="label mb-3 px-3 text-[0.5625rem] text-ivory/45">Add new</p>
        <div className="space-y-2">
          <Link href="/admin/team/new" className={`${item} border border-ivory/15 text-ivory hover:border-gold hover:text-gold-light`}>
            <Icon name="plus" />
            Team member
          </Link>
          <Link href="/admin/blog/new" className={`${item} border border-ivory/15 text-ivory hover:border-gold hover:text-gold-light`}>
            <Icon name="plus" />
            Blog article
          </Link>
        </div>
        {drafts > 0 && (
          <Link href="/admin/blog?status=draft" className="mt-4 block px-3 text-[0.8125rem] text-gold-light hover:underline">
            {drafts} {drafts === 1 ? "draft" : "drafts"} waiting to be published →
          </Link>
        )}
      </div>

      <div className="mt-auto space-y-1 border-t border-ivory/10 pt-4">
        <a href="/" target="_blank" rel="noopener noreferrer" className={`${item} text-ivory/70 hover:text-ivory`}>
          <Icon name="external" />
          View website
        </a>
        <form action={logout}>
          <button type="submit" className={`${item} w-full cursor-pointer text-ivory/70 hover:text-ivory`}>
            <Icon name="logout" />
            Sign out
          </button>
        </form>
      </div>
    </div>
  );
}

export function AdminShell({
  title,
  description,
  current,
  back,
  actions,
  children,
}: {
  title: string;
  description?: string;
  current: Section;
  /** Shows a "back" link above the title, e.g. { href: "/admin/team", label: "All team members" } */
  back?: { href: string; label: string };
  actions?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-ivory lg:grid lg:grid-cols-[17rem_1fr]">
      {/* Desktop sidebar */}
      <aside className="hidden bg-ink px-4 py-7 lg:sticky lg:top-0 lg:flex lg:h-screen lg:flex-col lg:gap-10 lg:overflow-y-auto">
        <div className="px-3">
          <Brand />
        </div>
        <SidebarNav current={current} />
      </aside>

      {/* Mobile top bar with a fold-out menu */}
      <details className="group sticky top-0 z-20 bg-ink lg:hidden">
        <summary className="flex cursor-pointer list-none items-center justify-between px-5 py-4 [&::-webkit-details-marker]:hidden">
          <Brand />
          <span className="flex items-center gap-2 text-ivory/80">
            <span className="label text-[0.625rem]">Menu</span>
            <Icon name="menu" />
          </span>
        </summary>
        <div className="max-h-[80vh] overflow-y-auto px-4 pb-6">
          <SidebarNav current={current} />
        </div>
      </details>

      <main className="min-w-0 px-5 py-8 sm:px-10 sm:py-12 xl:px-14">
        <div className="mx-auto max-w-6xl">
          {back && (
            <Link href={back.href} className="label mb-5 inline-flex items-center gap-2 text-[0.625rem] text-muted hover:text-ink">
              <Icon name="back" className="size-4" />
              {back.label}
            </Link>
          )}
          <div className="flex flex-wrap items-end justify-between gap-4 border-b border-line pb-6">
            <div>
              <h1 className="font-serif text-[2rem] leading-tight text-ink">{title}</h1>
              {description && <p className="mt-2 max-w-2xl text-muted">{description}</p>}
            </div>
            {actions && <div className="flex flex-wrap gap-3">{actions}</div>}
          </div>
          <div className="mt-8">{children}</div>
        </div>
      </main>
    </div>
  );
}
