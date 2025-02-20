"use client";

import { Suspense } from "react";
import Image from "next/image";
import { readFile } from "@/lib/utils";
import { notFound } from "next/navigation";

import { useContentDetail } from "../api/useContentDetail";

import { OtherAdvices } from "./other-advices";
import { OtherContentsSkeleton } from "@/components/content-skeleton";

import { Clock, User } from "lucide-react";

interface AdviceDetailProps {
  id: string;
}

const AdviceDetail = ({ id }: AdviceDetailProps) => {
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

            <span>Ахлах инженер Д.Санжжав</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            <time dateTime={data.createdDate.toString()}>
              {new Date(data.createdDate).toLocaleDateString()}
            </time>
          </div>
        </div>

        {data.attachments?.[0]?.url && (
          <div className="relative aspect-video w-full overflow-hidden rounded-lg">
            <Image
              src={readFile(data.attachments[0].url, "1000")}
              fill
              alt="Article banner"
              className="object-cover object-center"
            />
          </div>
        )}

        <div
          dangerouslySetInnerHTML={{ __html: data.content }}
          className="prose prose-sm sm:prose-base lg:prose-lg content-container content-text max-w-none space-y-7 text-gray-700"
        />

        <Suspense fallback={<OtherContentsSkeleton />}>
          <OtherAdvices />
        </Suspense>
      </article>
    </div>
  );
};

export { AdviceDetail };
