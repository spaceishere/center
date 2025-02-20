"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

export const HistoryVideo = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="mb-6 aspect-video w-full overflow-hidden rounded-lg bg-gray-100">
      <video
        src="/videos/history.mp4"
        controls
        autoPlay={false}
        className={cn(
          "mb-6 aspect-video w-full overflow-hidden rounded-lg bg-gray-50 object-contain object-center",
          isLoaded && "bg-gray-200 backdrop-blur-md",
        )}
        onLoad={() => setIsLoaded(true)}
      />
    </div>
  );
};

export const Vid = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  const videoSources = [
    "/videos/history1.mp4",
    "/videos/history2.mp4",
    "/videos/history3.mp4",
    "/videos/history4.mp4",
  ];

  return (
    <div className="mb-20 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:flex lg:justify-center">
      {videoSources.map((videoSrc, index) => (
        <div
          key={index}
          className="aspect-video w-full max-w-[300px] overflow-hidden rounded-lg bg-gray-100"
        >
          <video
            src={videoSrc}
            controls
            className={`aspect-video w-full overflow-hidden rounded-lg bg-gray-50 object-contain object-center ${
              isLoaded ? "bg-gray-200 backdrop-blur-md" : ""
            }`}
            onCanPlay={() => setIsLoaded(true)}
          />
        </div>
      ))}
    </div>
  );
};

export const BrandVideo = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="aspect-video w-full overflow-hidden rounded-lg bg-gray-100">
      <video
        src="/videos/brand.mp4"
        controls
        autoPlay={false}
        className={cn(
          "mb-6 aspect-video w-full overflow-hidden rounded-lg bg-gray-50 object-contain object-center",
          isLoaded && "bg-gray-200 backdrop-blur-md",
        )}
        onLoad={() => setIsLoaded(true)}
      />
    </div>
  );
};
