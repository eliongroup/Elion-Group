import { SectionHeading, TextLink } from "@/components/ui/Primitives";
import { getPublishedPosts } from "@/lib/cms/data";
import { localizedPath } from "@/lib/i18n";
import type { Dictionary } from "@/dictionaries/en";
import { PostCard } from "./PostCard";

/** Home page: the three newest published articles. Renders nothing until the first article is published. */
export async function LatestArticles({ t, locale }: { t: Dictionary["blog"]; locale: string }) {
  const posts = (await getPublishedPosts()).slice(0, 3);
  if (posts.length === 0) return null;
  return (
    <section aria-labelledby="latest-articles" className="section-y bg-white">
      <div className="container-lux">
        <SectionHeading index={t.latest.index} label={t.latest.label} title={t.latest.title} id="latest-articles" />
        <ul className="mt-14 grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:mt-20 lg:grid-cols-3">
          {posts.map((post, i) => (
            <li key={post.id} data-reveal style={{ "--reveal-delay": `${i * 60}ms` } as React.CSSProperties}>
              <PostCard post={post} href={localizedPath(locale, `/blog/${post.slug}`)} read={t.read} />
            </li>
          ))}
        </ul>
        <div className="mt-16 flex justify-center">
          <TextLink href={localizedPath(locale, "/blog")}>{t.latest.all}</TextLink>
        </div>
      </div>
    </section>
  );
}
