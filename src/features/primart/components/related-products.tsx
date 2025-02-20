import { getProducts } from "../api/getProducts";

import { RelatedProductsContent } from "./related-products-content";

interface RelatedProductsProps {
  catId: string;
}

export const RelatedProducts = async ({ catId }: RelatedProductsProps) => {
  const { products } = await getProducts({
    page: 1,
    perPage: 6,
    categoryId: catId,
  });

  return <RelatedProductsContent products={products || []} />;
};
