import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { deleteMember, moveMember } from "@/app/admin/actions";
import { ConfirmButton } from "@/components/admin/forms";
import { AdminShell } from "@/components/admin/shell";
import { Badge, EmptyState, Icon, Notice, buttonIcon, buttonPrimary } from "@/components/admin/ui";
import { requireAdmin } from "@/lib/admin/auth";
import { readTeam } from "@/lib/cms/data";

export const metadata: Metadata = { title: "Team" };

export default async function AdminTeamPage({ searchParams }: PageProps<"/admin/team">) {
  await requireAdmin();
  const [team, query] = await Promise.all([readTeam(), searchParams]);
  const add = (
    <Link href="/admin/team/new" className={buttonPrimary}>
      <Icon name="plus" className="size-4" /> Add team member
    </Link>
  );

  return (
    <AdminShell
      title="Team members"
      description="Photos, names and roles shown on the Team page. The order here is the order on the website."
      current="/admin/team"
      actions={team.length > 0 ? add : undefined}
    >
      {query.saved && <Notice>Saved. The Team page is updated.</Notice>}
      {query.deleted && <Notice>Team member deleted.</Notice>}
      {team.length === 0 ? (
        <EmptyState text="No team members yet. Add the first one and it will appear on the Team page." action={add} />
      ) : (
        <ul className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {team.map((m, i) => (
            <li key={m.id} className={`flex flex-col border border-line bg-white ${m.visible ? "" : "opacity-70"}`}>
              <Link href={`/admin/team/${m.id}`} className="group relative block aspect-[4/5] overflow-hidden bg-ivory-deep">
                {m.photoUrl ? (
                  <Image src={m.photoUrl} alt="" fill sizes="(min-width: 1280px) 360px, (min-width: 640px) 45vw, 100vw" quality={70} className="object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
                ) : (
                  <span className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-gold-ink">
                    <span className="font-serif text-[3.5rem]">{m.name.charAt(0)}</span>
                    <span className="label text-[0.5625rem] text-muted">No photo yet</span>
                  </span>
                )}
                <span className="absolute start-3 top-3 flex gap-2">
                  <span className="label bg-white/90 px-2 py-1 text-[0.5625rem] text-ink">#{i + 1}</span>
                  {!m.visible && <Badge>Hidden</Badge>}
                </span>
              </Link>
              <div className="flex-1 p-5">
                <p className="font-serif text-[1.25rem] text-ink">{m.name}</p>
                <p className="label mt-1 text-[0.625rem] text-gold-ink">{m.role}</p>
              </div>
              <div className="flex items-center gap-2 border-t border-line p-3">
                <Link href={`/admin/team/${m.id}`} className="label inline-flex min-h-9 flex-1 items-center justify-center gap-2 bg-ink px-3 text-[0.625rem] text-ivory hover:bg-gold-ink">
                  <Icon name="edit" className="size-4" /> Edit
                </Link>
                <form action={moveMember}>
                  <input type="hidden" name="id" value={m.id} />
                  <input type="hidden" name="direction" value="up" />
                  <button type="submit" disabled={i === 0} className={buttonIcon} aria-label={`Move ${m.name} earlier`} title="Move earlier">
                    <Icon name="up" className="size-4" />
                  </button>
                </form>
                <form action={moveMember}>
                  <input type="hidden" name="id" value={m.id} />
                  <input type="hidden" name="direction" value="down" />
                  <button type="submit" disabled={i === team.length - 1} className={buttonIcon} aria-label={`Move ${m.name} later`} title="Move later">
                    <Icon name="down" className="size-4" />
                  </button>
                </form>
                <form action={deleteMember}>
                  <input type="hidden" name="id" value={m.id} />
                  <ConfirmButton message={`Delete ${m.name}? This cannot be undone.`} className={`${buttonIcon} text-red-800 hover:border-red-800`}>
                    <Icon name="trash" className="size-4" />
                    <span className="sr-only">Delete {m.name}</span>
                  </ConfirmButton>
                </form>
              </div>
            </li>
          ))}
          <li>
            <Link
              href="/admin/team/new"
              className="flex h-full min-h-64 flex-col items-center justify-center gap-3 border border-dashed border-line-strong bg-white/50 text-muted transition-colors hover:border-gold hover:text-gold-ink"
            >
              <Icon name="plus" className="size-7" />
              <span className="label text-[0.625rem]">Add team member</span>
            </Link>
          </li>
        </ul>
      )}
    </AdminShell>
  );
}
