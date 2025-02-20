"use client";

import NextImage, { ImageProps as NextImageProps } from "next/image";

import { cn, posReadFile } from "@/lib/utils";
import cloudflareLoader from "@/lib/image-loader";
import { useEffect, useMemo, useState } from "react";
import { useMediaQuery } from "@/hooks/use-media-query";

const PLACEHOLDER = "/assets/image-placeholder.png";

const Image = ({
  src,
  alt,
  width,
  height,
  sizes,
  className,
  skipAnimation,
  quality,
  qualityWidth,
  ...restProps
}: ImageProps & { qualityWidth?: string }) => {
  // const fixedSrc = posReadFile(src || "");
  const fixedSrc = useMemo(() => {
    return posReadFile(src || "", qualityWidth || "1000");
  }, [src, qualityWidth]);

  const [srcI, setSrcI] = useState(fixedSrc || PLACEHOLDER);
  const [loading, setLoading] = useState(true);

  const getLoader = () => {
    if (srcI.includes("//:localhost") || srcI.startsWith("/")) return undefined;
    return cloudflareLoader;
  };

  const isDesktop = useMediaQuery("(min-width: 768px)");
  const isTablet = useMediaQuery("(min-width: 480px)");

  const getWidth = () => {
    if (isDesktop) return width?.toString();

    const widthNum = parseInt(width?.toString() || "0");

    if (isTablet && widthNum > 768) return "768";

    if (widthNum > 480) return "480";

    return widthNum.toString();
  };

  const handleComplete = () => setLoading(false);
  const onError = () => setSrcI(PLACEHOLDER);
  const fill = (!width && !height) || undefined;

  const fromCF = useMemo(() => {
    return srcI.includes("https://imagedelivery.net/");
  }, [srcI]);

  useEffect(() => {
    getLoader();
  }, [srcI]);

  return (
    <NextImage
      {...restProps}
      quality={quality}
      src={
        fromCF
          ? cloudflareLoader({
              src: srcI,
              width: parseInt(getWidth() || "480"),
              quality: parseInt(quality?.toString() || "75"),
            })
          : srcI
      }
      loader={getLoader()}
      onLoad={handleComplete}
      onError={onError}
      alt={alt || ""}
      fill={fill}
      width={width}
      height={height}
      unoptimized={fromCF}
      className={cn(
        "object-cover duration-700 ease-in-out",
        !skipAnimation && loading
          ? "scale-110 blur-2xl grayscale"
          : "scale-100 blur-0 grayscale-0",
        srcI === PLACEHOLDER && "object-contain p-10",
        className,
      )}
      sizes={
        fill
          ? sizes ||
            `(max-width: 768px) 20vw,
      (max-width: 1200px) 15vw,
      15vw`
          : undefined
      }
    />
  );
};

export type CommonImageProps = Omit<
  Omit<Omit<NextImageProps, "alt">, "src">,
  "fill"
>;

type ImageProps = CommonImageProps & {
  src?: string;
  alt?: string;
  skipAnimation?: boolean;
};
export default Image;
