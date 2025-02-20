import { Metadata } from "next";
import { Suspense } from "react";
import { getMetadata } from "@/lib/metadata";

import { Container } from "@/components/container";
import { Infos } from "@/features/contents/components/infos";
import { OtherInfos } from "@/features/contents/components/other-infos";
import {
  ContentsSkeleton,
  OtherContentsSkeleton,
} from "@/components/content-skeleton";

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
          />
        }
      >
        <Infos />
      </Suspense>

      <Suspense fallback={<OtherContentsSkeleton />}>
        <OtherInfos />
      </Suspense>
    </Container>
  );
};

export default InfosPage;
