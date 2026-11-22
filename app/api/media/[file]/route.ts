import { readLocalImage } from "@/lib/cms/storage";

const TYPES: Record<string, string> = { jpg: "image/jpeg", png: "image/png", webp: "image/webp", avif: "image/avif" };

/** Local development only: serves images uploaded in the admin panel from ./.data/media. In production, images live in Supabase Storage. */
export async function GET(_request: Request, { params }: RouteContext<"/api/media/[file]">) {
  const { file } = await params;
  const type = TYPES[file.split(".").pop() ?? ""];
  const data = type ? await readLocalImage(file) : null;
  if (!data) return new Response("Not found", { status: 404 });
  return new Response(new Uint8Array(data), {
    headers: { "Content-Type": type, "Cache-Control": "public, max-age=31536000, immutable" },
  });
}
