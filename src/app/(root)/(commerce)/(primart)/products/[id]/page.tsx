import { Suspense } from "react";
import { notFound } from "next/navigation";
import { Metadata } from "next";

import { getMetadata } from "@/lib/metadata";
import {
  getProductDetail,
  getMetaProductDetail,
} from "@/features/primart/api/getProductDetail";

import { Container } from "@/components/container";
import { RelatedProducts } from "@/features/primart/components/related-products";
import { ProductDetail } from "@/features/primart/components/product-detail";
import { RelatedProductsContentSkeleton } from "@/features/primart/components/related-products-content";
import { LatestProducts } from "@/features/primart/components/latest-products";

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const product = await getMetaProductDetail(params.id);
  return await getMetadata(`Примарт - ${product.name || "Бараа"}`);
}

const ProductDetailPage = async ({ params }: { params: { id: string } }) => {
  const product = await getProductDetail(params.id);

  if (!product) notFound();

  return (
    <Container className="space-y-8">
      <ProductDetail product={product} />

      <Suspense fallback={<RelatedProductsContentSkeleton />}>
        <RelatedProducts catId={product.category?._id!} />
      </Suspense>

      <LatestProducts />
    </Container>
  );
};

export default ProductDetailPage;
