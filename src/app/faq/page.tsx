"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SectionTitle } from "@/components/section-title";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useFaqs } from "@/features/home/api/useFaqs";

const FaqPage = () => {
  const { faqs } = useFaqs();
  const router = useRouter();

  return (
    <div className="w-full space-y-[40px] px-4 md:px-10 lg:px-20" id="faq">
      <SectionTitle title={["Түгээмэл", " асуулт хариулт"]} />

      <div className="grid grid-cols-1 gap-5 gap-y-[30px] sm:gap-x-8 md:grid-cols-2 md:gap-x-10 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-[50px]">
        <Accordion
          className="col-span-1 lg:col-span-2 xl:col-span-3"
          type="single"
          collapsible
        >
          {faqs.map((item) => (
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

      <div className="mt-6 flex justify-center">
        <Button onClick={() => router.push("/")}>Буцах</Button>
      </div>
    </div>
  );
};

export default FaqPage;
