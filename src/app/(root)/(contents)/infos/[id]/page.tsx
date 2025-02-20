import { Suspense } from "react";
import { Metadata } from "next";
import { getMetadata } from "@/lib/metadata";

import { Container } from "@/components/container";
import { InfoDetail } from "@/features/contents/components/info-detail";
import { ContentDetailSkeleton } from "@/components/content-skeleton";

export async function generateMetadata(): Promise<Metadata> {
  return await getMetadata("Мэдээлэл");
}

const AdvicePage = ({ params: { id } }: { params: { id: string } }) => {
  return (
    <Container className="space-y-8">
      <Suspense fallback={<ContentDetailSkeleton />}>
        <InfoDetail id={id} />
      </Suspense>
    </Container>
  );
};

export default AdvicePage;
