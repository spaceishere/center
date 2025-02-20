"use client";

import Link from "next/link";
import { useTransition } from "react";
import { toast } from "sonner";
import { readFile } from "@/lib/utils";

import { useOpenJobs } from "../api/useOpenJobs";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

import { MapPin, Phone } from "lucide-react";

export const OpenJobs = () => {
  const { jobs } = useOpenJobs();

  const [isPending, startTransition] = useTransition();

  const onDownload = (fileName?: string, fileUrl?: string) => {
    if (!fileName || !fileUrl) return;

    startTransition(async () => {
      try {
        const response = await fetch(readFile(fileUrl));
        if (!response.ok) {
          toast.error("Татах боломжгүй байна.");
          return;
        }

        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = url;
        link.download = fileName;
        link.click();

        window.URL.revokeObjectURL(url);
      } catch (error) {
        console.error("Error downloading file:", error);
      }
    });
  };

  return (
    <Accordion className="w-full space-y-3" type="single" collapsible>
      {jobs.map((job) => (
        <AccordionItem
          value={job.id}
          key={job.id}
          className="rounded-lg border px-3 py-4 shadow"
        >
          <AccordionTrigger>
            <div className="flex flex-col items-start gap-y-3">
              <p>{job.title}</p>
              <div className="flex items-center gap-x-3 text-muted-foreground">
                <div className="flex items-center">
                  <MapPin className="mr-2 size-5" />
                  <p>{job.branch}</p>
                </div>

                <a className="flex items-center" href={`tel:${job.phone}`}>
                  <Phone className="mr-2 size-5" />
                  <p>{job.phone}</p>
                </a>
              </div>
            </div>
          </AccordionTrigger>

          <AccordionContent className="space-y-6">
            <div dangerouslySetInnerHTML={{ __html: job.content }} />

            <div className="flex flex-col justify-between gap-x-10 gap-y-4 lg:flex-row lg:items-start lg:justify-center">
              <p className="font-medium text-primary">
                Танд зөвхөн ажиллах чин хүсэл эрмэлзэл, эрч хүч байхад болно.
                Бид таныг ажилд авахад бэлэн.
              </p>

              <div className="flex items-center gap-x-3">
                {job.fileName && job.fileUrl && (
                  <Button
                    disabled={isPending}
                    className="px-4 py-3"
                    variant={"outline"}
                    onClick={() => onDownload(job.fileName, job.fileUrl)}
                  >
                    Анткет татах
                  </Button>
                )}
                <Button className="px-4 py-3" disabled={isPending} asChild>
                  <Link
                    href={"https://m.zangia.mn/company/Prius-Center"}
                    target="_blank"
                  >
                    Анткет бөглөх
                  </Link>
                </Button>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export const OpenJobsSkeleton = () => {
  return (
    <div className="flex flex-col gap-y-6">
      {new Array(3).fill("").map((_, index) => (
        <Skeleton className="w-full space-y-4 rounded-lg p-4" key={index}>
          <Skeleton className="h-7 w-[200px] bg-gray-200" />

          <div className="flex w-full items-center gap-x-4">
            <Skeleton className="h-5 w-[140px] bg-gray-200" />
            <Skeleton className="h-5 w-[140px] bg-gray-200" />
          </div>
        </Skeleton>
      ))}
    </div>
  );
};
