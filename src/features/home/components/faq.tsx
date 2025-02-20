"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useFaqs } from "../api/useFaqs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SectionTitle } from "@/components/section-title";
import { Button } from "@/components/ui/button";

export const Faq = () => {
  const { faqs } = useFaqs();
  const router = useRouter();
  const visibleFaqs = faqs.slice(0, 6);

  return (
    <div className="w-full space-y-[40px]" id="faq">
      <SectionTitle title={["Түгээмэл", " асуулт хариулт"]} />

      <div className="grid grid-cols-1 gap-5 gap-y-[30px] sm:gap-x-8 md:grid-cols-2 md:gap-x-10 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-[50px]">
        <div className="col-span-1 hidden md:block">
          <div className="relative aspect-square w-full">
            <Image src="/assets/home/faq.svg" alt="" width={500} height={500} />
          </div>
        </div>

        <Accordion
          className="xl:col-span- col-span-1 lg:col-span-2"
          type="single"
          collapsible
        >
          {visibleFaqs.map((item) => (
            <AccordionItem key={item._id} value={item._id}>
              <AccordionTrigger className="text-left font-medium text-[#101828]">
                {item.title}
              </AccordionTrigger>
              <AccordionContent>
                <div
                  dangerouslySetInnerHTML={{ __html: item.content }}
                  className="content-text font-normal text-[#667085]"
                />
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      {faqs.length > 3 && (
        <div className="flex justify-center">
          <Button onClick={() => router.push("/faq")} className="mt-4">
            Бүх асуултыг харах
          </Button>
        </div>
      )}
    </div>
  );
};
