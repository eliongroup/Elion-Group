import type { Metadata } from "next";
import { PostCard } from "@/components/blog/PostCard";
import { CtaBand, TextHeader } from "@/components/sections/Shared";
import { getPublishedPosts } from "@/lib/cms/data";
import { getDictionary } from "@/lib/dictionary";
import { hasLocale, localizedPath } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";

export async function generateMetadata({ params }: PageProps<"/[locale]/blog">): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(locale)) return {};
  const dict = await getDictionary(locale);
  return pageMetadata({ locale, path: "/blog", title: dict.blog.meta.title, description: dict.blog.meta.description });
}

/** Articles are written and published from the admin panel (/admin/blog). */
export default async function BlogPage({ params }: PageProps<"/[locale]/blog">) {
  const { locale } = await params;
  const dict = await getDictionary();
  const t = dict.blog;
  const posts = await getPublishedPosts();

  return (
    <>
      <TextHeader label={t.header.label} title={t.header.title} text={t.header.text} />
      <section aria-label={t.header.title} className="section-y bg-white">
        <div className="container-lux">
          {posts.length === 0 ? (
            <p className="mx-auto max-w-xl border border-line px-6 py-16 text-center font-serif text-[1.375rem] text-muted">{t.empty}</p>
          ) : (
            <ul className="grid gap-x-6 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post, i) => (
                <li key={post.id} data-reveal style={{ "--reveal-delay": `${(i % 3) * 60}ms` } as React.CSSProperties}>
                  <PostCard post={post} href={localizedPath(locale, `/blog/${post.slug}`)} read={t.read} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
      <CtaBand t={dict.ctaBand} locale={locale} />
    </>
  );
}
