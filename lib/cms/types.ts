/** Content managed from the admin panel (/admin). */

export type TeamMember = {
  id: string;
  name: string;
  role: string;
  bio: string;
  /** Portrait (4:5 works best). Empty: a monogram panel is shown instead. */
  photoUrl: string;
  /** Hidden members stay in the admin panel but are not shown on the site. */
  visible: boolean;
};

export type PostStatus = "draft" | "published";

export type Post = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  /** Simple formatting: blank line = new paragraph, "## " heading, "- " list, "> " quote, **bold**, [link](https://…) */
  body: string;
  category: string;
  author: string;
  /** YYYY-MM-DD */
  date: string;
  coverUrl: string;
  coverAlt: string;
  status: PostStatus;
  updatedAt: string;
};
