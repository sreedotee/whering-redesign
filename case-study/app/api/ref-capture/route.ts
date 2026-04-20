import { promises as fs } from "fs";
import path from "path";

const CAPTURES_ROOT = path.join(process.cwd(), "ref-captures");

function getMimeType(ext: string) {
  switch (ext.toLowerCase()) {
    case ".png":
      return "image/png";
    case ".jpg":
    case ".jpeg":
      return "image/jpeg";
    case ".json":
      return "application/json; charset=utf-8";
    case ".css":
      return "text/css; charset=utf-8";
    case ".html":
      return "text/html; charset=utf-8";
    default:
      return "application/octet-stream";
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const requestedPath = searchParams.get("path");

  if (!requestedPath) {
    return new Response("Missing path", { status: 400 });
  }

  const normalizedPath = path.normalize(requestedPath);
  const absolutePath = path.resolve(CAPTURES_ROOT, normalizedPath);

  if (!absolutePath.startsWith(CAPTURES_ROOT)) {
    return new Response("Invalid path", { status: 403 });
  }

  try {
    const file = await fs.readFile(absolutePath);
    return new Response(file, {
      status: 200,
      headers: {
        "Content-Type": getMimeType(path.extname(absolutePath)),
        "Cache-Control": "no-store",
      },
    });
  } catch {
    return new Response("Not found", { status: 404 });
  }
}
