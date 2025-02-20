"use client";

import type { ImageLoaderProps } from "next/image";

export default function cloudflareLoader({
  src,
  width,
  quality,
}: ImageLoaderProps) {
  const params = [`width=${width}`, "format=avif"];
  const trimmedSrc = src.trim();

  if (trimmedSrc.startsWith("https://imagedelivery.net/")) {
    return `${trimmedSrc.slice(0, -6)}${params.join(",")}`;
  }

  const q = `quality=${quality || 75}`;
  return `https://erxes.io/cdn-cgi/image/${params
    .concat([q])
    .join(",")}/${trimmedSrc}`;
}
