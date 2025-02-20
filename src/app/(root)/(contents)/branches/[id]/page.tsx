import { Suspense } from "react";
import { Metadata } from "next";
import { getMetadata } from "@/lib/metadata";

import { BranchDetail } from "@/features/contents/components/branch-detail";
import { ContentDetailSkeleton } from "@/components/content-skeleton";

export async function generateMetadata(): Promise<Metadata> {
  return await getMetadata("Салбар");
}

const BranchesPage = ({ params }: { params: { id: string } }) => {
  return (
    <Suspense fallback={<ContentDetailSkeleton />}>
      <BranchDetail id={params.id} />
    </Suspense>
  );
};

export default BranchesPage;
