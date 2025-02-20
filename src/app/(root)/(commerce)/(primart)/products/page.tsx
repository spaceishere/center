import { Suspense } from "react";

import { getMetadata } from "@/lib/metadata";
import { getProductsCount } from "@/features/primart/api/getProductsCount";

import { Container } from "@/components/container";
import { ProductsSidebar } from "@/features/primart/components/products-sidebar";
import { Products } from "@/features/primart/components/products";
import { ProductsSkeleton } from "@/features/primart/components/products-content";
import { CategorySheet } from "@/features/primart/components/category-sheet";
import { getFirstCatId } from "@/features/primart/api/getFirstCatId";

export async function generateMetadata() {
  return await getMetadata("Примарт");
}

const ProductsPage = async ({
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
  const firstCatId = await getFirstCatId();

  return (
    <Container className="flex gap-x-6">
      <ProductsSidebar totalCount={count} />

      <Suspense fallback={<ProductsSkeleton />}>
        <Products q={q} catId={catId ? catId : firstCatId} page={page} />
      </Suspense>

      <CategorySheet totalCount={count} />
    </Container>
  );
};

export default ProductsPage;
