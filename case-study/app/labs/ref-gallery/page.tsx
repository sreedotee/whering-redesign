import { promises as fs } from "fs";
import path from "path";

import { GalleryClient } from "./GalleryClient";

type MetaPayload = {
  sectionName?: string;
  siteName?: string;
  page?: {
    title?: string;
    url?: string;
  };
  element?: {
    textPreview?: string;
  };
};

type RefEntry = {
  id: string;
  siteName: string;
  sectionName: string;
  pageTitle: string;
  pageUrl: string;
  textPreview: string;
  screenshotPath: string;
  htmlPath: string;
  reconstructedPath?: string;
  previewPath?: string;
  stylesPath: string;
  metaPath: string;
};

const CAPTURES_ROOT = path.join(process.cwd(), "ref-captures");

async function getDirectories(source: string) {
  const entries = await fs.readdir(source, { withFileTypes: true });
  return entries.filter((entry) => entry.isDirectory()).map((entry) => entry.name);
}

async function fileExists(filePath: string) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function getRefEntries(): Promise<RefEntry[]> {
  try {
    const sites = await getDirectories(CAPTURES_ROOT);
    const refs: RefEntry[] = [];

    for (const site of sites.sort()) {
      const sitePath = path.join(CAPTURES_ROOT, site);
      const sections = await getDirectories(sitePath);

      for (const section of sections.sort()) {
        const sectionPath = path.join(sitePath, section);
        const metaPath = path.join(sectionPath, "meta.json");
        const reconstructedPath = path.join(sectionPath, "reconstructed.html");
        const previewPath = path.join(sectionPath, "preview.html");

        try {
          const meta = JSON.parse(await fs.readFile(metaPath, "utf8")) as MetaPayload;
          const hasReconstructed = await fileExists(reconstructedPath);
          const hasPreview = await fileExists(previewPath);
          refs.push({
            id: `${site}/${section}`,
            siteName: meta.siteName || site,
            sectionName: meta.sectionName || section,
            pageTitle: meta.page?.title || "",
            pageUrl: meta.page?.url || "",
            textPreview: meta.element?.textPreview || "",
            screenshotPath: path.posix.join(site, section, "node-screenshot.png"),
            htmlPath: path.posix.join(site, section, "outerHTML.html"),
            reconstructedPath: hasReconstructed
              ? path.posix.join(site, section, "reconstructed.html")
              : undefined,
            previewPath: hasPreview ? path.posix.join(site, section, "preview.html") : undefined,
            stylesPath: path.posix.join(site, section, "computed-styles.json"),
            metaPath: path.posix.join(site, section, "meta.json"),
          });
        } catch {
          // Skip malformed captures.
        }
      }
    }

    return refs;
  } catch {
    return [];
  }
}

export default async function RefGalleryPage() {
  const refs = await getRefEntries();

  return <GalleryClient refs={refs} />;
}
