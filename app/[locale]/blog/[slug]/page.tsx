import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArticleBody } from "@/components/blog/ArticleBody";
import { CtaBand } from "@/components/sections/Shared";
import { Label, TextLink } from "@/components/ui/Primitives";
import { site } from "@/content/site";
import { formatDate, getPublishedPost, getPublishedPosts, readingMinutes } from "@/lib/cms/data";
import { getDictionary } from "@/lib/dictionary";
import { hasLocale, localizedPath } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";

/** Cache Components needs at least one param; a placeholder resolves to 404 until the first article exists. */
export async function generateStaticParams() {
  const posts = await getPublishedPosts();
  return posts.length ? posts.map((p) => ({ slug: p.slug })) : [{ slug: "first-article" }];
}

export async function generateMetadata({ params }: PageProps<"/[locale]/blog/[slug]">): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!hasLocale(locale)) return {};
  const post = await getPublishedPost(slug);
  if (!post) return {};
  const base = pageMetadata({ locale, path: `/blog/${slug}`, title: post.title, description: post.excerpt || post.title });
  return {
    ...base,
    openGraph: {
      ...base.openGraph,
      type: "article",
      publishedTime: post.date,
      ...(post.coverUrl ? { images: [{ url: post.coverUrl, alt: post.coverAlt }] } : {}),
    },
  };
}

export default async function ArticlePage({ params }: PageProps<"/[locale]/blog/[slug]">) {
  const { locale, slug } = await params;
  const post = await getPublishedPost(slug);
  if (!post) notFound();
  const dict = await getDictionary();
  const t = dict.blog;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt || undefined,
    datePublished: post.date,
    dateModified: post.updatedAt,
    image: post.coverUrl || undefined,
    author: { "@type": post.author ? "Person" : "Organization", name: post.author || site.name },
    publisher: { "@type": "Organization", name: site.name, url: site.url },
    mainEntityOfPage: `${site.url}${localizedPath(locale, `/blog/${post.slug}`)}`,
  };

  return (
    <>
      <article>
        <header className="bg-ivory pt-[calc(var(--header-h)+4rem)] pb-14 md:pt-[calc(var(--header-h)+6rem)] md:pb-20">
          <div className="container-lux max-w-4xl">
            <Label className="hero-rise">{post.category || t.header.label}</Label>
            <h1 className="title-roman hero-rise mt-8 text-h1 text-ink" style={{ animationDelay: "120ms" }}>
              {post.title}
            </h1>
            {post.excerpt && (
              <p className="hero-rise mt-8 max-w-2xl text-lead text-muted" style={{ animationDelay: "240ms" }}>
                {post.excerpt}
              </p>
            )}
            <p className="label hero-rise mt-10 text-[0.6875rem] text-muted" style={{ animationDelay: "320ms" }}>
              <time dateTime={post.date}>{formatDate(post.date)}</time>
              {post.author && ` · ${t.by} ${post.author}`} · {readingMinutes(post.body)} {t.minRead}
            </p>
          </div>
        </header>

        {post.coverUrl && (
          <div className="container-lux max-w-5xl">
            <div className="relative -mt-2 aspect-[16/9] overflow-hidden bg-ivory-deep">
              <Image src={post.coverUrl} alt={post.coverAlt} fill priority sizes="(min-width: 1024px) 1024px, 100vw" quality={80} className="object-cover" />
            </div>
          </div>
        )}

        <div className="container-lux max-w-3xl py-16 md:py-24">
          <ArticleBody body={post.body} />
          <div className="mt-16 border-t border-line pt-8">
            <TextLink href={localizedPath(locale, "/blog")}>{t.all}</TextLink>
          </div>
        </div>
      </article>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <CtaBand t={dict.ctaBand} locale={locale} />
    </>
  );
}
