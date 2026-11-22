"use client";

import { useActionState, useState } from "react";
import { useFormStatus } from "react-dom";
import Link from "next/link";
import { login, saveMember, savePost, type FormState } from "@/app/admin/actions";
import { slugify } from "@/lib/cms/slug";
import type { Post, TeamMember } from "@/lib/cms/types";
import { FormSection, buttonPrimary, buttonSecondary, inputClass, labelClass } from "./ui";

function Submit({ children }: { children: React.ReactNode }) {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending} className={buttonPrimary}>
      {pending ? "Saving…" : children}
    </button>
  );
}

function ErrorMessage({ state }: { state: FormState }) {
  if (!state.error) return null;
  return (
    <p role="alert" className="border-s-2 border-red-700 bg-red-50 px-4 py-3 text-[0.9375rem] text-red-900">
      {state.error}
    </p>
  );
}

function Field({ label, hint, htmlFor, children }: { label: string; hint?: string; htmlFor: string; children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <label htmlFor={htmlFor} className={labelClass}>
        {label}
      </label>
      {children}
      {hint && <p className="text-[0.8125rem] text-muted">{hint}</p>}
    </div>
  );
}

/** Image upload with a live preview and an option to remove the current image. */
function ImageField({ name, label, hint, current, removeName, aspect }: { name: string; label: string; hint: string; current: string; removeName: string; aspect: string }) {
  const [preview, setPreview] = useState(current);
  const [removed, setRemoved] = useState(false);
  const shown = removed ? "" : preview;
  return (
    <div className="space-y-2">
      <label htmlFor={name} className={labelClass}>
        {label}
      </label>
      <div className="flex flex-wrap items-start gap-5">
        <div className={`relative w-36 shrink-0 overflow-hidden border border-line bg-ivory-deep ${aspect}`}>
          {shown ? (
            // eslint-disable-next-line @next/next/no-img-element -- local preview of an unsaved upload
            <img src={shown} alt="" className="absolute inset-0 size-full object-cover" />
          ) : (
            <span className="absolute inset-0 flex items-center justify-center text-[0.75rem] text-muted">No image</span>
          )}
        </div>
        <div className="min-w-0 flex-1 space-y-3">
          <input
            id={name}
            name={name}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/avif"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                setPreview(URL.createObjectURL(file));
                setRemoved(false);
              }
            }}
            className="block w-full text-[0.875rem] text-muted file:me-4 file:cursor-pointer file:border file:border-ink file:bg-white file:px-4 file:py-2 file:text-[0.75rem] file:tracking-[0.15em] file:text-ink file:uppercase"
          />
          <p className="text-[0.8125rem] text-muted">{hint}</p>
          {current && (
            <label className="flex items-center gap-2 text-[0.875rem] text-ink">
              <input type="checkbox" name={removeName} checked={removed} onChange={(e) => setRemoved(e.target.checked)} className="size-4 accent-[#9a7b45]" />
              Remove current image
            </label>
          )}
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------- Login */

export function LoginForm() {
  const [state, action] = useActionState(login, {});
  return (
    <form action={action} className="space-y-6">
      <ErrorMessage state={state} />
      <Field label="Password" htmlFor="password">
        <input id="password" name="password" type="password" required autoComplete="current-password" autoFocus className={inputClass} />
      </Field>
      <LoginButton />
    </form>
  );
}

function LoginButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending} className={`${buttonPrimary} w-full`}>
      {pending ? "Signing in…" : "Sign in"}
    </button>
  );
}

/* ---------------------------------------------------------------- Team */

export function TeamForm({ member }: { member?: TeamMember }) {
  const [state, action] = useActionState(saveMember, {});
  const v = (key: keyof TeamMember) => state.fields?.[key] ?? String(member?.[key] ?? "");
  return (
    <form action={action} className="grid gap-6 lg:grid-cols-[1fr_22rem]">
      <input type="hidden" name="id" value={member?.id ?? ""} />
      <div className="space-y-6">
        <ErrorMessage state={state} />
        <FormSection title="1. Details" hint="Name and role appear under the photo on the Team page.">
          <div className="grid gap-6 sm:grid-cols-2">
            <Field label="Full name *" htmlFor="name">
              <input id="name" name="name" required maxLength={120} defaultValue={v("name")} placeholder="e.g. Giorgi Beridze" className={inputClass} />
            </Field>
            <Field label="Role *" htmlFor="role" hint="For example: Chief Executive Officer">
              <input id="role" name="role" required maxLength={120} defaultValue={v("role")} placeholder="e.g. Managing Partner" className={inputClass} />
            </Field>
          </div>
          <Field label="Short biography" htmlFor="bio" hint="Two or three sentences work best. Optional.">
            <textarea id="bio" name="bio" rows={6} maxLength={1000} defaultValue={v("bio")} className={inputClass} />
          </Field>
        </FormSection>
        <FormSection title="2. Portrait photo" hint="JPG, PNG or WebP, up to 5 MB. A vertical 4:5 photo looks best. Without a photo, a gold initial panel is shown.">
          <ImageField name="photo" label="Choose a photo" hint="The preview updates as soon as you pick a file." current={member?.photoUrl ?? ""} removeName="removePhoto" aspect="aspect-[4/5]" />
        </FormSection>
      </div>

      <aside className="space-y-6 self-start border border-line bg-white p-6 lg:sticky lg:top-6">
        <h2 className="font-serif text-[1.25rem] text-ink">3. Publish</h2>
        <label className="flex items-start gap-3 text-[0.9375rem] text-ink">
          <input type="checkbox" name="visible" defaultChecked={member ? member.visible : true} className="mt-1 size-4 accent-[#9a7b45]" />
          <span>
            Show on the Team page
            <span className="block text-[0.8125rem] text-muted">Untick to keep this person here without showing them on the website.</span>
          </span>
        </label>
        <div className="flex flex-col gap-3 border-t border-line pt-6">
          <Submit>{member ? "Save changes" : "Add team member"}</Submit>
          <Link href="/admin/team" className={buttonSecondary}>
            Cancel
          </Link>
        </div>
      </aside>
    </form>
  );
}

/* ---------------------------------------------------------------- Blog */

export function PostForm({ post, today }: { post?: Post; today: string }) {
  const [state, action] = useActionState(savePost, {});
  const v = (key: keyof Post) => state.fields?.[key] ?? String(post?.[key] ?? "");
  const [title, setTitle] = useState(v("title"));
  const [slug, setSlug] = useState(v("slug"));
  const [slugEdited, setSlugEdited] = useState(Boolean(post));
  const shownSlug = slugEdited ? slug : slugify(title);

  return (
    <form action={action} className="grid gap-8 lg:grid-cols-[1fr_20rem]">
      <div className="space-y-7 border border-line bg-white p-6 sm:p-10">
        <ErrorMessage state={state} />
        <input type="hidden" name="id" value={post?.id ?? ""} />
        <Field label="Title *" htmlFor="title">
          <input
            id="title"
            name="title"
            required
            maxLength={160}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={`${inputClass} font-serif text-[1.375rem]`}
          />
        </Field>
        <Field label="Web address" htmlFor="slug" hint={`The article will be at /blog/${shownSlug || "…"}`}>
          <input
            id="slug"
            name="slug"
            maxLength={80}
            value={shownSlug}
            onChange={(e) => {
              setSlugEdited(true);
              setSlug(e.target.value);
            }}
            className={inputClass}
          />
        </Field>
        <Field label="Summary" htmlFor="excerpt" hint="One or two sentences, shown on article cards and in search results.">
          <textarea id="excerpt" name="excerpt" rows={3} maxLength={320} defaultValue={v("excerpt")} className={inputClass} />
        </Field>
        <Field
          label="Article text *"
          htmlFor="body"
          hint="Leave a blank line between paragraphs. Start a line with ## for a heading, - for a list item or > for a quote. Use **bold** and [link text](https://example.com)."
        >
          <textarea id="body" name="body" required rows={22} defaultValue={v("body")} className={`${inputClass} font-mono text-[0.875rem] leading-relaxed`} />
        </Field>
      </div>

      <aside className="space-y-7 self-start border border-line bg-white p-6 lg:sticky lg:top-6">
        <Field label="Status" htmlFor="status" hint="Drafts are only visible here in the admin panel.">
          <select id="status" name="status" defaultValue={v("status") || "draft"} className={inputClass}>
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
        </Field>
        <Field label="Publication date *" htmlFor="date">
          <input id="date" name="date" type="date" required defaultValue={v("date") || today} className={inputClass} />
        </Field>
        <Field label="Category" htmlFor="category" hint="For example: News, Real Estate, Investment">
          <input id="category" name="category" maxLength={60} defaultValue={v("category")} className={inputClass} />
        </Field>
        <Field label="Author" htmlFor="author">
          <input id="author" name="author" maxLength={120} defaultValue={v("author")} placeholder="ELION GROUP" className={inputClass} />
        </Field>
        <ImageField
          name="cover"
          label="Cover image"
          hint="Landscape, up to 5 MB."
          current={post?.coverUrl ?? ""}
          removeName="removeCover"
          aspect="aspect-[3/2]"
        />
        <Field label="Cover description (alt text)" htmlFor="coverAlt" hint="Required with a cover image. Describe what the photo shows.">
          <input id="coverAlt" name="coverAlt" maxLength={200} defaultValue={v("coverAlt")} className={inputClass} />
        </Field>
        <div className="flex flex-col gap-3 border-t border-line pt-7">
          <Submit>{post ? "Save article" : "Create article"}</Submit>
          <Link href="/admin/blog" className={buttonSecondary}>
            Cancel
          </Link>
        </div>
      </aside>
    </form>
  );
}

/* ---------------------------------------------------------------- Delete */

/** A submit button that asks for confirmation first. */
export function ConfirmButton({ message, className, children }: { message: string; className: string; children: React.ReactNode }) {
  return (
    <button
      type="submit"
      className={className}
      onClick={(e) => {
        if (!window.confirm(message)) e.preventDefault();
      }}
    >
      {children}
    </button>
  );
}
