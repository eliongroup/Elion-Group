import Image from "next/image";
import Link from "next/link";
import { ArrowIcon } from "@/components/ui/Icons";
import { formatDate } from "@/lib/cms/data";
import type { Post } from "@/lib/cms/types";

/** Article card used on the Blog page and in the home-page "Latest articles" block. */
export function PostCard({ post, href, read }: { post: Post; href: string; read: string }) {
  return (
    <article className="group relative flex h-full flex-col">
      <div className="zoom-frame relative aspect-[3/2] bg-ivory-deep">
        {post.coverUrl ? (
          <Image src={post.coverUrl} alt={post.coverAlt} fill sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" quality={70} className="object-cover" />
        ) : (
          <span aria-hidden className="absolute inset-0 flex items-center justify-center">
            <span className="absolute inset-4 border border-gold/40" />
            <span className="font-serif text-[3.5rem] text-gold/60">E</span>
          </span>
        )}
      </div>
      <p className="label mt-6 text-[0.625rem] text-muted">
        {post.category && <span className="text-gold-ink">{post.category} · </span>}
        <time dateTime={post.date}>{formatDate(post.date)}</time>
      </p>
      <h3 className="mt-3 font-serif text-[1.5rem] leading-snug text-ink">
        {/* The whole card is clickable through this link's overlay */}
        <Link href={href} className="link-draw after:absolute after:inset-0">
          {post.title}
        </Link>
      </h3>
      {post.excerpt && <p className="mt-3 text-muted">{post.excerpt}</p>}
      <span aria-hidden className="label mt-auto inline-flex items-center gap-3 pt-6 text-[0.6875rem] text-ink">
        {read}
        <ArrowIcon size={14} className="transition-transform duration-300 group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
      </span>
    </article>
  );
}
