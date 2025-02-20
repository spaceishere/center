import { Suspense } from "react";
import { Metadata } from "next";

import { getMetadata } from "@/lib/metadata";

import { Container } from "@/components/container";
import { Advices } from "@/features/contents/components/advices";
import { OtherAdvices } from "@/features/contents/components/other-advices";
import {
  ContentsSkeleton,
  OtherContentsSkeleton,
} from "@/components/content-skeleton";

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
            titles={["Приус центр", " зөвлөж байна"]}
            buttonLabel="Бүх зөвлөгөө"
          />
        }
      >
        <Advices />
      </Suspense>

      <Suspense fallback={<OtherContentsSkeleton />}>
        <OtherAdvices />
      </Suspense>
    </Container>
  );
};

export default AdvicesPage;
