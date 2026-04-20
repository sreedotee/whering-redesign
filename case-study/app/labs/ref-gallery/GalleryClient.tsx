"use client";

import { useEffect, useMemo, useState } from "react";

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

type Props = {
  refs: RefEntry[];
};

type SelectedNodePayload = {
  className: string;
  outerHTML: string;
  tagName: string;
  textPreview: string;
};

type PreviewState = {
  html: string;
  rootStyleText: string;
  heuristicCssText: string;
  tailwindConfigText: string;
  rectWidth: number;
  rectHeight: number;
  screenshotUrl: string;
  isImageOnly: boolean;
};

function buildPreviewDocument(
  html: string,
  rootStyleText: string,
  heuristicCssText: string,
  tailwindConfigText: string,
  screenshotUrl: string,
  rectWidth: number,
  rectHeight: number,
  isImageOnly: boolean,
) {
  const escapedHtml = JSON.stringify(html);
  const escapedStyle = JSON.stringify(rootStyleText);
  const escapedHeuristicCssText = JSON.stringify(heuristicCssText);
  const escapedTailwindConfigText = JSON.stringify(tailwindConfigText);
  const escapedScreenshotUrl = JSON.stringify(screenshotUrl);
  const escapedRectWidth = JSON.stringify(rectWidth);
  const escapedRectHeight = JSON.stringify(rectHeight);
  const escapedIsImageOnly = JSON.stringify(isImageOnly);

  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <script>
      window.tailwind = {
        config: JSON.parse(${escapedTailwindConfigText})
      };
    </script>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
      * { box-sizing: border-box; }
      html, body { margin: 0; padding: 0; }
      body {
        min-height: 100vh;
        display: flex;
        justify-content: center;
        align-items: flex-start;
        padding: 32px;
        background: linear-gradient(180deg, #fbf9f5 0%, #f4efe7 100%);
        font-family: Inter, Arial, Helvetica, sans-serif;
      }
      #capture-stage {
        min-height: calc(100vh - 64px);
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: flex-start;
      }
      #capture-wrapper {
        position: relative;
        max-width: 100%;
        overflow: hidden;
        border-radius: 20px;
        background: white;
        box-shadow: 0 24px 80px rgba(17, 17, 17, 0.08);
      }
      #capture-wrapper > * {
        max-width: 100%;
      }
      #reference-overlay {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        object-fit: fill;
        pointer-events: none;
        user-select: none;
        z-index: 4;
        opacity: 0.34;
        transition: opacity 160ms ease-out;
      }
      body[data-interacting="true"] #reference-overlay {
        opacity: 0.15;
      }
      #reference-fallback {
        position: relative;
        display: none;
        z-index: 2;
      }
      #capture-overlay {
        position: relative;
        z-index: 3;
      }
      [data-capture-hovered="true"] {
        outline: 2px solid rgba(46, 120, 255, 0.85);
        outline-offset: 2px;
      }
      [data-capture-selected="true"] {
        outline: 2px solid rgba(17, 17, 17, 0.92);
        outline-offset: 2px;
        box-shadow: 0 0 0 6px rgba(17, 17, 17, 0.08);
      }
      img {
        max-width: 100%;
        display: block;
      }
      a {
        color: inherit;
        text-decoration: none;
      }
      button {
        font: inherit;
      }
      h1, h2, h3, h4, h5, h6, p, ul {
        margin: 0;
      }
      ul {
        padding-left: 1.25em;
      }
    </style>
    <style id="heuristic-styles"></style>
  </head>
  <body>
    <div id="capture-stage">
      <div id="capture-wrapper">
        <img id="reference-overlay" alt="" />
        <div id="reference-fallback"></div>
        <div id="capture-overlay"></div>
      </div>
    </div>
    <script>
      const html = ${escapedHtml};
      const rootStyleText = ${escapedStyle};
      const heuristicCssText = ${escapedHeuristicCssText};
      const screenshotUrl = ${escapedScreenshotUrl};
      const rectWidth = ${escapedRectWidth};
      const rectHeight = ${escapedRectHeight};
      const isImageOnly = ${escapedIsImageOnly};

      const wrapper = document.getElementById("capture-wrapper");
      const referenceOverlay = document.getElementById("reference-overlay");
      const fallback = document.getElementById("reference-fallback");
      const overlay = document.getElementById("capture-overlay");
      const heuristicStyleElement = document.getElementById("heuristic-styles");

      if (heuristicStyleElement) {
        heuristicStyleElement.textContent = heuristicCssText;
      }

      if (rectWidth && rectHeight) {
        wrapper.style.width = rectWidth + "px";
        wrapper.style.minHeight = rectHeight + "px";
      }

      if (screenshotUrl) {
        referenceOverlay.src = screenshotUrl;
      } else {
        referenceOverlay.style.display = "none";
      }

      overlay.innerHTML = html;

      const root = overlay.firstElementChild;
      if (root && rootStyleText) {
        root.style.cssText += ";" + rootStyleText;
      }

      if (root && rectWidth && !root.style.width) {
        root.style.width = rectWidth + "px";
      }

      if (root && rectHeight && !root.style.height && !root.style.minHeight) {
        root.style.minHeight = rectHeight + "px";
      }

      overlay.querySelectorAll("img").forEach((img) => {
        const widthAttr = img.getAttribute("width");
        const heightAttr = img.getAttribute("height");
        if (widthAttr && !img.style.width) img.style.width = widthAttr + "px";
        if (heightAttr && !img.style.height) img.style.height = heightAttr + "px";
        if (!img.style.maxWidth) img.style.maxWidth = "100%";
      });

      if (isImageOnly) {
        overlay.style.display = "none";
        referenceOverlay.style.display = "none";
        fallback.style.display = "block";
        fallback.innerHTML = screenshotUrl
          ? '<img src="' + screenshotUrl + '" alt="" style="display:block;width:100%;height:auto;" />'
          : "<div>No screenshot available.</div>";
      }

      let hoveredNode = null;
      let selectedNode = null;

      function setInteractionState(isActive) {
        document.body.dataset.interacting = isActive ? "true" : "false";
      }

      function clearFlag(node, attribute) {
        if (node && node.removeAttribute) node.removeAttribute(attribute);
      }

      function setFlag(node, attribute) {
        if (node && node.setAttribute) node.setAttribute(attribute, "true");
      }

      function summarizeNode(node) {
        return {
          tagName: node.tagName.toLowerCase(),
          className: node.className || "",
          textPreview: (node.textContent || "").trim().replace(/\\s+/g, " ").slice(0, 240),
          outerHTML: node.outerHTML || ""
        };
      }

      overlay.addEventListener("mouseover", (event) => {
        const target = event.target.closest("*");
        if (!target || target === document.body || target === document.documentElement) return;
        if (hoveredNode === target) return;
        clearFlag(hoveredNode, "data-capture-hovered");
        hoveredNode = target;
        setInteractionState(true);
        if (hoveredNode !== selectedNode) setFlag(hoveredNode, "data-capture-hovered");
      });

      overlay.addEventListener("mouseleave", () => {
        if (hoveredNode && hoveredNode !== selectedNode) {
          clearFlag(hoveredNode, "data-capture-hovered");
        }
        hoveredNode = null;
        if (!selectedNode) setInteractionState(false);
      });

      overlay.addEventListener("click", (event) => {
        event.preventDefault();
        event.stopPropagation();
        const target = event.target.closest("*");
        if (!target) return;

        clearFlag(selectedNode, "data-capture-selected");
        if (selectedNode && selectedNode !== hoveredNode) {
          clearFlag(selectedNode, "data-capture-hovered");
        }

        selectedNode = target;
        clearFlag(selectedNode, "data-capture-hovered");
        setFlag(selectedNode, "data-capture-selected");
        setInteractionState(true);

        window.parent.postMessage(
          {
            type: "ref-preview-selection",
            payload: summarizeNode(selectedNode)
          },
          "*"
        );
      });
    </script>
  </body>
</html>`;
}

function serializeRootStyles(styleMap: Record<string, string>) {
  return Object.entries(styleMap)
    .filter(
      ([, value]) =>
        value &&
        value !== "initial" &&
        value !== "normal" &&
        value !== "none" &&
        value !== "auto",
    )
    .map(([property, value]) => `${property}:${value}`)
    .join(";");
}

function escapeCssClassName(className: string) {
  return className.replace(/([^a-zA-Z0-9_-])/g, "\\$1");
}

function extractClassNames(html: string) {
  const classNames = new Set<string>();
  const classAttributePattern = /class="([^"]+)"/g;

  let match = classAttributePattern.exec(html);
  while (match) {
    const classValue = match[1];
    for (const token of classValue.split(/\s+/)) {
      if (token) classNames.add(token);
    }

    match = classAttributePattern.exec(html);
  }

  return Array.from(classNames);
}

function buildTailwindRuntimeConfig(styleMap: Record<string, string>) {
  const colors: Record<string, string> = {};
  const spacing: Record<string, string> = {};
  const borderRadius: Record<string, string> = {};
  const boxShadow: Record<string, string> = {};
  const fontFamily: Record<string, string> = {};

  for (const [property, value] of Object.entries(styleMap)) {
    if (!value) continue;

    if (property.startsWith("--color-")) {
      colors[property.slice("--color-".length)] = `var(${property})`;
      continue;
    }

    if (property.startsWith("--spacing-")) {
      spacing[property.slice("--spacing-".length)] = value;
      continue;
    }

    if (property === "--spacing") {
      spacing.DEFAULT = value;
      continue;
    }

    if (property.startsWith("--radius-")) {
      borderRadius[property.slice("--radius-".length)] = value;
      continue;
    }

    if (property.startsWith("--shadow-")) {
      boxShadow[property.slice("--shadow-".length)] = value;
      continue;
    }

    if (property.startsWith("--font-")) {
      const suffix = property.slice("--font-".length);
      if (!suffix.includes("-size") && !suffix.includes("-weight") && !suffix.includes("-line-height")) {
        fontFamily[suffix] = value;
      }
    }
  }

  return JSON.stringify({
    corePlugins: {
      preflight: false,
    },
    theme: {
      extend: {
        colors,
        spacing,
        borderRadius,
        boxShadow,
        fontFamily,
      },
    },
  });
}

function buildHeuristicStyleSheet(html: string) {
  const classNames = extractClassNames(html);
  const rules: string[] = [
    `
      .MuiBox-root { min-width: 0; }
      .MuiTypography-root { margin: 0; }
      .MuiTypography-h1 {
        font-family: var(--font-heading-h1-xlarge-family, inherit);
        font-size: var(--font-heading-h1-xlarge-size, 3.5rem);
        line-height: var(--font-heading-h1-xlarge-line-height, 1.05);
        letter-spacing: var(--font-heading-h1-xlarge-letter-spacing, -0.03em);
        font-weight: var(--font-heading-h1-xlarge-weight, 500);
      }
      .MuiTypography-h2 {
        font-family: var(--font-heading-h2-large-family, inherit);
        font-size: var(--font-heading-h2-large-size, 2.75rem);
        line-height: var(--font-heading-h2-large-line-height, 1.05);
        letter-spacing: var(--font-heading-h2-large-letter-spacing, -0.025em);
        font-weight: var(--font-heading-h2-large-weight, 500);
      }
      .MuiTypography-h3 {
        font-family: var(--font-heading-h3-medium-family, var(--font-heading-h5-xsmall-family, inherit));
        font-size: var(--font-heading-h3-medium-size, var(--font-heading-h5-xsmall-size, 2rem));
        line-height: var(--font-heading-h3-medium-line-height, var(--font-heading-h5-xsmall-line-height, 1.15));
        letter-spacing: var(--font-heading-h3-medium-letter-spacing, 0);
        font-weight: var(--font-heading-h3-medium-weight, var(--font-heading-h5-xsmall-weight, 500));
      }
      .MuiTypography-h4, .MuiTypography-h5, .MuiTypography-h6 {
        font-family: var(--font-heading-h5-xsmall-family, inherit);
        font-size: var(--font-heading-h5-xsmall-size, 1.5rem);
        line-height: var(--font-heading-h5-xsmall-line-height, 1.15);
        letter-spacing: var(--font-heading-h5-xsmall-letter-spacing, 0);
        font-weight: var(--font-heading-h5-xsmall-weight, 500);
      }
      .MuiTypography-body1 {
        font-family: var(--font-paragraph-medium-family, inherit);
        font-size: var(--font-paragraph-medium-size, 1rem);
        line-height: var(--font-paragraph-medium-line-height, 1.7);
        letter-spacing: var(--font-paragraph-medium-letter-spacing, -0.005em);
        font-weight: var(--font-paragraph-medium-weight, 400);
        color: var(--color-content-secondary, inherit);
      }
      .MuiTypography-body2 {
        font-family: var(--font-paragraph-small-family, inherit);
        font-size: var(--font-paragraph-small-size, 0.875rem);
        line-height: var(--font-paragraph-small-line-height, 1.7);
        letter-spacing: var(--font-paragraph-small-letter-spacing, 0);
        font-weight: var(--font-paragraph-small-weight, 400);
        color: var(--color-content-secondary, inherit);
      }
      .MuiSvgIcon-root {
        display: inline-block;
        width: 1em;
        height: 1em;
        flex-shrink: 0;
        fill: currentColor;
      }
      button {
        border: 0;
        background: transparent;
        font: inherit;
        color: inherit;
      }
      .cta-icon {
        display: inline-flex;
        align-items: center;
        justify-content: center;
      }
    `,
  ];

  const exactClassRules: Record<string, string> = {
    "w-inline-block": "display:inline-block;",
    truncate: "overflow:hidden;text-overflow:ellipsis;white-space:nowrap;",
    "aspect-square": "aspect-ratio:1 / 1;",
    "cursor-pointer": "cursor:pointer;",
    "overflow-hidden": "overflow:hidden;",
    "overflow-auto": "overflow:auto;",
    relative: "position:relative;",
    absolute: "position:absolute;",
    block: "display:block;",
    hidden: "display:none;",
    "inline-flex": "display:inline-flex;",
    "shrink-0": "flex-shrink:0;",
    "grow-0": "flex-grow:0;",
    "grow-1": "flex-grow:1;",
    "flex-1": "flex:1 1 0%;min-width:0;",
    "w-full": "width:100%;",
    "h-full": "height:100%;",
    "h-auto": "height:auto;",
    "max-w-full": "max-width:100%;",
    "rounded-full": "border-radius:9999px;",
    "font-medium": "font-weight:500;",
    "font-semibold": "font-weight:600;",
    "font-bold": "font-weight:700;",
    "text-left": "text-align:left;",
    "text-center": "text-align:center;",
  };

  for (const className of classNames) {
    const selector = `.${escapeCssClassName(className)}`;

    if (exactClassRules[className]) {
      rules.push(`${selector}{${exactClassRules[className]}}`);
      continue;
    }

    const roundedMatch = className.match(/^rounded-([a-z0-9-]+)$/i);
    if (roundedMatch) {
      rules.push(`${selector}{border-radius:var(--radius-${roundedMatch[1]}, inherit);}`);
      continue;
    }
  }

  return rules.join("\n");
}

export function GalleryClient({ refs }: Props) {
  const [selectedId, setSelectedId] = useState(refs[0]?.id ?? "");
  const [previewState, setPreviewState] = useState<PreviewState | null>(null);
  const [selectedNode, setSelectedNode] = useState<SelectedNodePayload | null>(null);

  const selectedIndex = useMemo(
    () => refs.findIndex((entry) => entry.id === selectedId),
    [refs, selectedId],
  );

  const selected = selectedIndex >= 0 ? refs[selectedIndex] : refs[0];

  useEffect(() => {
    if (!selected) return;

    let isActive = true;
    setPreviewState(null);
    setSelectedNode(null);

    async function loadPreview() {
      const previewHtmlPath = selected.reconstructedPath || selected.htmlPath;
      const [htmlResponse, stylesResponse, metaResponse] = await Promise.all([
        fetch(`/api/ref-capture?path=${encodeURIComponent(previewHtmlPath)}`),
        fetch(`/api/ref-capture?path=${encodeURIComponent(selected.stylesPath)}`),
        fetch(`/api/ref-capture?path=${encodeURIComponent(selected.metaPath)}`),
      ]);

      if (!htmlResponse.ok || !stylesResponse.ok || !metaResponse.ok) {
        throw new Error("Failed to load preview assets");
      }

      const html = await htmlResponse.text();
      const styleMap = (await stylesResponse.json()) as Record<string, string>;
      const meta = (await metaResponse.json()) as {
        element?: { tagName?: string };
        rect?: { width?: number; height?: number };
      };
      const rootStyleText = serializeRootStyles(styleMap);
      const heuristicCssText = buildHeuristicStyleSheet(html);
      const tailwindConfigText = buildTailwindRuntimeConfig(styleMap);
      const rectWidth = meta.rect?.width ?? 0;
      const rectHeight = meta.rect?.height ?? 0;
      const isImageOnly = meta.element?.tagName?.toLowerCase() === "img";

      if (isActive) {
        setPreviewState({
          html,
          rootStyleText,
          heuristicCssText,
          tailwindConfigText,
          rectWidth,
          rectHeight,
          screenshotUrl: `/api/ref-capture?path=${encodeURIComponent(selected.screenshotPath)}`,
          isImageOnly,
        });
      }
    }

    loadPreview().catch(() => {
      if (isActive) {
        setPreviewState({
          html: `<div style="padding:24px;border:1px dashed rgba(0,0,0,0.16);border-radius:18px;background:white;color:#181925;font:14px/1.5 Inter, Arial, sans-serif;">Preview unavailable for this capture.</div>`,
          rootStyleText: "",
          heuristicCssText: "",
          tailwindConfigText: "{}",
          rectWidth: 0,
          rectHeight: 0,
          screenshotUrl: "",
          isImageOnly: false,
        });
      }
    });

    return () => {
      isActive = false;
    };
  }, [selected]);

  useEffect(() => {
    function handleMessage(event: MessageEvent) {
      if (event.data?.type === "ref-preview-selection") {
        setSelectedNode(event.data.payload as SelectedNodePayload);
      }
    }

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  if (!selected) {
    return (
      <main className="min-h-screen bg-[#f7f5f2] px-6 py-10 text-[#181925]">
        <div className="mx-auto max-w-4xl rounded-[28px] bg-white p-10 shadow-[0_20px_80px_rgba(17,17,17,0.06)]">
          <h1 className="text-3xl font-semibold tracking-[-0.04em]">Reference Gallery</h1>
          <p className="mt-3 text-sm text-[#666666]">No captures found in `ref-captures` yet.</p>
        </div>
      </main>
    );
  }

  const hasPrevious = selectedIndex > 0;
  const hasNext = selectedIndex < refs.length - 1;

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,_#fff_0%,_#f7f5f2_55%,_#efeae1_100%)] px-6 py-8 text-[#181925]">
      <div className="mx-auto grid max-w-[1540px] grid-cols-[320px_minmax(0,1fr)] gap-6">
        <aside className="sticky top-8 h-[calc(100vh-4rem)] overflow-hidden rounded-[28px] border border-black/5 bg-white/80 p-5 shadow-[0_20px_70px_rgba(17,17,17,0.06)] backdrop-blur">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#8b8173]">
              Ref Browser
            </p>
            <h1 className="mt-2 text-[28px] font-semibold tracking-[-0.05em] text-[#111111]">
              Captured recreations
            </h1>
            <p className="mt-2 text-sm leading-relaxed text-[#6d6b68]">
              Browse refs one at a time, click directly inside the preview, and point me to the
              exact pieces you want to reuse.
            </p>
          </div>

          <div className="mt-5 flex items-center gap-2 rounded-full bg-[#f4efe8] px-3 py-2 text-xs text-[#7a6f62]">
            <span>{selectedIndex + 1}</span>
            <span>/</span>
            <span>{refs.length}</span>
            <span className="ml-2 truncate">{selected.siteName}</span>
          </div>

          <div className="mt-5 h-[calc(100%-12rem)] overflow-y-auto pr-1">
            <div className="space-y-2">
              {refs.map((entry, index) => {
                const isActive = entry.id === selected.id;

                return (
                  <button
                    key={entry.id}
                    type="button"
                    onClick={() => setSelectedId(entry.id)}
                    className={`w-full rounded-[20px] border px-4 py-3 text-left transition ${
                      isActive
                        ? "border-[#111111] bg-[#111111] text-white shadow-[0_14px_30px_rgba(17,17,17,0.18)]"
                        : "border-black/6 bg-[#faf7f2] text-[#181925] hover:border-black/12 hover:bg-white"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <span
                        className={`text-[11px] font-semibold uppercase tracking-[0.16em] ${
                          isActive ? "text-white/60" : "text-[#8b8173]"
                        }`}
                      >
                        {index + 1}. {entry.siteName}
                      </span>
                    </div>
                    <div className="mt-1 text-sm font-medium leading-snug tracking-[-0.02em]">
                      {entry.sectionName}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </aside>

        <section className="rounded-[32px] border border-black/5 bg-white/85 p-6 shadow-[0_24px_90px_rgba(17,17,17,0.07)] backdrop-blur">
          <div className="flex items-start justify-between gap-6">
            <div className="max-w-3xl">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#8b8173]">
                {selected.siteName}
              </p>
              <h2 className="mt-2 text-[34px] font-semibold tracking-[-0.055em] text-[#111111]">
                {selected.sectionName}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-[#666666]">
                {selected.textPreview || selected.pageTitle}
              </p>
              <a
                href={selected.pageUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-[#111111]"
              >
                Open source page
                <span aria-hidden="true">↗</span>
              </a>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => hasPrevious && setSelectedId(refs[selectedIndex - 1].id)}
                disabled={!hasPrevious}
                className="rounded-full border border-black/10 px-4 py-2 text-sm font-medium text-[#111111] disabled:cursor-not-allowed disabled:opacity-35"
              >
                Prev
              </button>
              <button
                type="button"
                onClick={() => hasNext && setSelectedId(refs[selectedIndex + 1].id)}
                disabled={!hasNext}
                className="rounded-full bg-[#111111] px-4 py-2 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-35"
              >
                Next
              </button>
            </div>
          </div>

          <div className="mt-6 grid gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
            <div className="overflow-hidden rounded-[28px] border border-black/6 bg-[#f7f5f2] p-5">
              <div className="overflow-hidden rounded-[22px] bg-[linear-gradient(180deg,#fbf9f5_0%,#f4efe7_100%)]">
                {previewState ? (
                  <iframe
                    key={selected.id}
                    title={selected.sectionName}
                    srcDoc={buildPreviewDocument(
                      previewState.html,
                      previewState.rootStyleText,
                      previewState.heuristicCssText,
                      previewState.tailwindConfigText,
                      previewState.screenshotUrl,
                      previewState.rectWidth,
                      previewState.rectHeight,
                      previewState.isImageOnly,
                    )}
                    className="h-[780px] w-full border-0 bg-transparent"
                  />
                ) : (
                  <div className="flex h-[780px] items-center justify-center text-sm text-[#7a6f62]">
                    Loading preview...
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <div className="rounded-[24px] border border-black/6 bg-[#faf7f2] p-5">
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#8b8173]">
                  Selected Element
                </p>
                {selectedNode ? (
                  <div className="mt-4 space-y-3">
                    <div className="rounded-2xl border border-black/6 bg-white px-4 py-3">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#8b8173]">
                        Tag
                      </p>
                      <p className="mt-1 text-sm font-medium text-[#111111]">{selectedNode.tagName}</p>
                    </div>
                    <div className="rounded-2xl border border-black/6 bg-white px-4 py-3">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#8b8173]">
                        Class
                      </p>
                      <p className="mt-1 break-all text-sm text-[#4b4741]">
                        {selectedNode.className || "No class"}
                      </p>
                    </div>
                    <div className="rounded-2xl border border-black/6 bg-white px-4 py-3">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#8b8173]">
                        Text Preview
                      </p>
                      <p className="mt-1 text-sm leading-relaxed text-[#4b4741]">
                        {selectedNode.textPreview || "No text"}
                      </p>
                    </div>
                    <div className="rounded-2xl border border-black/6 bg-white px-4 py-3">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#8b8173]">
                        outerHTML
                      </p>
                      <pre className="mt-2 max-h-[220px] overflow-auto whitespace-pre-wrap break-words text-xs leading-relaxed text-[#4b4741]">
                        {selectedNode.outerHTML}
                      </pre>
                    </div>
                  </div>
                ) : (
                  <p className="mt-4 text-sm leading-relaxed text-[#666666]">
                    Click any element inside the preview to inspect it here.
                  </p>
                )}
              </div>

              <div className="rounded-[24px] border border-black/6 bg-[#faf7f2] p-5">
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#8b8173]">
                  Useful Files
                </p>
                <div className="mt-4 space-y-2 text-sm">
                  <a
                    href={`/api/ref-capture?path=${encodeURIComponent(selected.htmlPath)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="block rounded-2xl border border-black/6 bg-white px-4 py-3 font-medium text-[#111111]"
                  >
                    outerHTML.html
                  </a>
                  {selected.reconstructedPath ? (
                    <a
                      href={`/api/ref-capture?path=${encodeURIComponent(selected.reconstructedPath)}`}
                      target="_blank"
                      rel="noreferrer"
                      className="block rounded-2xl border border-black/6 bg-white px-4 py-3 font-medium text-[#111111]"
                    >
                      reconstructed.html
                    </a>
                  ) : null}
                  {selected.previewPath ? (
                    <a
                      href={`/api/ref-capture?path=${encodeURIComponent(selected.previewPath)}`}
                      target="_blank"
                      rel="noreferrer"
                      className="block rounded-2xl border border-black/6 bg-white px-4 py-3 font-medium text-[#111111]"
                    >
                      preview.html
                    </a>
                  ) : null}
                  <a
                    href={`/api/ref-capture?path=${encodeURIComponent(selected.stylesPath)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="block rounded-2xl border border-black/6 bg-white px-4 py-3 font-medium text-[#111111]"
                  >
                    computed-styles.json
                  </a>
                  <a
                    href={`/api/ref-capture?path=${encodeURIComponent(selected.metaPath)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="block rounded-2xl border border-black/6 bg-white px-4 py-3 font-medium text-[#111111]"
                  >
                    meta.json
                  </a>
                  <a
                    href={`/api/ref-capture?path=${encodeURIComponent(selected.screenshotPath)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="block rounded-2xl border border-black/6 bg-white px-4 py-3 font-medium text-[#111111]"
                  >
                    node-screenshot.png
                  </a>
                </div>
              </div>

              <div className="rounded-[24px] border border-black/6 bg-[#faf7f2] p-5">
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#8b8173]">
                  Page Title
                </p>
                <p className="mt-3 text-sm leading-relaxed text-[#4b4741]">{selected.pageTitle}</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
