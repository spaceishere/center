import { Suspense } from "react";
import { Metadata } from "next";

import { getMetadata } from "@/lib/metadata";

import { Container } from "@/components/container";
import { ContentDetailSkeleton } from "@/components/content-skeleton";
import { AdviceDetail } from "@/features/contents/components/advice-detail";

export async function generateMetadata(): Promise<Metadata> {
  return await getMetadata("Зөвлөгөө");
}

const AdvicePage = ({ params: { id } }: { params: { id: string } }) => {
  return (
    <Container className="space-y-8">
      <Suspense fallback={<ContentDetailSkeleton />}>
        <AdviceDetail id={id} />
      </Suspense>
    </Container>
  );
};

export default AdvicePage;
