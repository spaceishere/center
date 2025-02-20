import { Metadata } from "next";
import { Suspense } from "react";

import { getMetadata } from "@/lib/metadata";
import { getProductsCount } from "@/features/primart/api/getProductsCount";
import { getFirstCatId } from "@/features/primart/api/getFirstCatId";

import {
  PrimartBanner,
  PrimartBannerSkeleton,
} from "@/features/primart/components/primart-banner";
import { Container } from "@/components/container";
import { ProductsSidebar } from "@/features/primart/components/products-sidebar";
import { ProductsSkeleton } from "@/features/primart/components/products-content";
import { Products } from "@/features/primart/components/products";
import { CategorySheet } from "@/features/primart/components/category-sheet";

export async function generateMetadata(): Promise<Metadata> {
  return await getMetadata("Примарт");
}

const PrimartPage = async ({
  searchParams: { catId, q, page },
}: {
  searchParams: {
    catId?: string;
    q?: string;
    page?: string;
  };
}) => {
  const count = await getProductsCount({
    categoryId: catId,
    searchValue: q ? q : "",
    tag: "wfHldLjIhb7f7Hgw0of8q",
  });

  return (
    <Container className="space-y-10">
      <Suspense fallback={<PrimartBannerSkeleton />}>
        <PrimartBanner />
      </Suspense>

      <div className="flex w-full scroll-mt-40 gap-x-6" id="primart-products">
        <ProductsSidebar totalCount={count} />

        <Suspense fallback={<ProductsSkeleton />}>
          <Products q={q} catId={catId} page={page} />
        </Suspense>

        <CategorySheet totalCount={count} />
      </div>

      {/* <Suspense fallback={<PrimartProductsContentSkeleton />}>
        <PrimartProducts />
      </Suspense>

      <LatestProducts /> */}
    </Container>
  );
};

export default PrimartPage;
