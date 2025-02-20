import { getProducts } from "../api/getProducts";
import { ProductsPagination } from "./products-pagination";
import { ProductsContent } from "./products-content";
import { ProductsSearch } from "./products-search";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getFirstCatId } from "../api/getFirstCatId";

interface ProductsProps {
  catId?: string;
  q?: string;
  page?: string;
}

export const Products = async ({ catId, q, page }: ProductsProps) => {
  const firstCatId = await getFirstCatId();

  const { products, count } = await getProducts({
    page: parseInt(page || "1"),
    perPage: 20,
    categoryId: catId ? catId : firstCatId,
    searchValue: q ? q : "",
    tag: "wfHldLjIhb7f7Hgw0of8q",
  });

  const pageCount = Math.ceil(count / 20);

  if (count === 0) {
    return (
      <div className="w-full space-y-6">
        <ProductsSearch q={q} />

        <div className="flex w-full justify-center">
          <div className="flex w-full max-w-[600px] flex-col items-center justify-center rounded-xl border-4 border-dashed border-gray-200 py-28">
            <p className="font-medium text-gray-600">Бараа байхгүй байна</p>
            <p className="font-medium text-gray-600">Шүүлтүүрийг цэвэрлэх үү</p>

            <Button asChild className="mt-4">
              <Link href={"/primart#primart-products"}>Цэвэрлэх</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full space-y-6">
      <ProductsSearch q={q} />

      <ProductsContent products={products || []} />

      <ProductsPagination pageCount={pageCount} page={parseInt(page || "1")} />
    </div>
  );
};
