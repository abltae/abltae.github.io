import { projects } from "@/lib/projects";

// Static export only supports GET handlers prerendered at build time,
// so this is written out as out/api/projects.json.
export const dynamic = "force-static";

export async function GET() {
  return Response.json(projects);
}
