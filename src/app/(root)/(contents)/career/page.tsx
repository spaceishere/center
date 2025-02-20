import { Suspense } from "react";
import { getMetadata } from "@/lib/metadata";

import { Container } from "@/components/container";
import { CareerHeader } from "@/features/contents/components/career-header";
import { OpenJobs } from "@/features/contents/components/open-jobs";
import { OpenJobsSkeleton } from "@/features/contents/components/open-jobs";

export async function generateMetadata() {
  return await getMetadata("Нээлттэй ажлын байр");
}

const CareerPage = () => {
  return (
    <Container className="space-y-6 pt-10">
      <CareerHeader />

      <Suspense fallback={<OpenJobsSkeleton />}>
        <OpenJobs />
      </Suspense>
    </Container>
  );
};

export default CareerPage;
