import { getProducts } from "../api/getProducts";
import { PrimartProductsContent } from "./primart-products-content";

export const PrimartProducts = async () => {
  const { products } = await getProducts({
    tag: "wfHldLjIhb7f7Hgw0of8q",
  });

  const { products: products2 } = await getProducts({
    tag: "2znBi5xWhERHPAtBXDLEy",
  });

  return (
    <PrimartProductsContent
      products={products || []}
      products2={products2 || []}
    />
  );
};
