"use client";

import { Suspense } from "react";
import Image from "next/image";
import { notFound } from "next/navigation";
import { readFile } from "@/lib/utils";

import { useContentDetail } from "../api/useContentDetail";

import { OtherContentsSkeleton } from "@/components/content-skeleton";
import { OtherInfos } from "./other-infos";

import { Clock, User } from "lucide-react";

interface InfoDetailProps {
  id: string;
}

export const InfoDetail = ({ id }: InfoDetailProps) => {
  const { data } = useContentDetail(id);

  if (!data) {
    notFound();
  }

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      <article className="space-y-8">
        <h1 className="text-2xl font-bold sm:text-3xl lg:text-4xl">
          {data.title}
        </h1>

        <div className="flex flex-wrap items-center gap-4 border-y border-border py-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
              <User className="h-5 w-5 text-primary" />
            </div>
            <span>
              {data?.createdUser?.username || "Ахлах инженер Д.Санжжав"}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            <time dateTime={data.createdDate.toString()}>
              {new Date(data.createdDate).toLocaleDateString()}
            </time>
          </div>
        </div>

        {(data.attachments?.[0]?.url || data.image?.url) && (
          <div className="relative aspect-video w-full overflow-hidden rounded-lg">
            <Image
              src={readFile(
                data.attachments?.[0]?.url || data.image?.url,
                "1000",
              )}
              fill
              alt="Article banner"
              className="object-cover object-center"
            />
          </div>
        )}

        <div
          dangerouslySetInnerHTML={{ __html: data.content }}
          className="prose prose-sm sm:prose-base lg:prose-lg content-container content-text max-w-none space-y-7"
        />

        <Suspense fallback={<OtherContentsSkeleton />}>
          <OtherInfos />
        </Suspense>
      </article>
    </div>
  );
};
