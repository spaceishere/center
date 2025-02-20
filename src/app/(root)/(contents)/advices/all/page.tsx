import { Suspense } from "react";
import { Metadata } from "next";

import { getMetadata } from "@/lib/metadata";

import { Container } from "@/components/container";
import { Advices } from "@/features/contents/components/advices";
import { ContentsSkeleton } from "@/components/content-skeleton";

export async function generateMetadata(): Promise<Metadata> {
  return await getMetadata("Зөвлөгөөнүүд");
}

export const revalidate = 300;

const AdvicesPage = () => {
  return (
    <Container className="w-full space-y-16">
      <Suspense
        fallback={
          <ContentsSkeleton
            titles={["Таны", " машинд"]}
            buttonLabel="Бүх зөвлөгөө"
            limit={10}
          />
        }
      >
        <Advices limit={1000} />
      </Suspense>
    </Container>
  );
};

export default AdvicesPage;
