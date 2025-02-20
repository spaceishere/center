import { Suspense } from "react";
import { Metadata } from "next";
import { getMetadata } from "@/lib/metadata";

import { Container } from "@/components/container";
import { Infos } from "@/features/contents/components/infos";
import { ContentsSkeleton } from "@/components/content-skeleton";

export async function generateMetadata(): Promise<Metadata> {
  return await getMetadata("Мэдээлэлүүд");
}

const InfosPage = () => {
  return (
    <Container className="w-full space-y-16">
      <Suspense
        fallback={
          <ContentsSkeleton
            titles={["Мэдээ", " мэдээлэл"]}
            buttonLabel="Бүх мэдээ"
            limit={1000}
          />
        }
      >
        <Infos limit={1000} />
      </Suspense>
    </Container>
  );
};

export default InfosPage;
