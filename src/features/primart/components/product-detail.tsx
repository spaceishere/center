"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import { useAtom } from "jotai";
import { useProductHistory } from "@/features/primart/store/useProductHistory";
import { addToCartAtom } from "@/features/cart/store/cart";

import Image from "@/components/image";
import { Button } from "@/components/ui/button";

import { ChevronRight, Minus, Plus } from "lucide-react";

import { TProduct as TPro } from "../types";
import { TProduct } from "@/features/cart/types";
import { TProductDetail } from "../types";
import { useReminder } from "../api/useReminder";
import { toast } from "sonner";
import { useCurrentOrder } from "../api/useCurrentOrder";
import { useBranches } from "../api/useBranches";
import { IAttachment } from "@/types";
import { Separator } from "@/components/ui/separator";

interface ProductDetailProps {
  product: TProductDetail;
}

export const ProductDetail = ({ product }: ProductDetailProps) => {
  const router = useRouter();

  const [count, setCount] = useState(1);
  const {
    refetch,
    reminder,
    loading: loadingReminder,
  } = useReminder(product._id);
  const {
    orderItems,
    loading: loadingOrderItems,
    refetch: refetchOrderItems,
  } = useCurrentOrder();
  const { branches } = useBranches();

  const { addProduct } = useProductHistory();

  useEffect(() => {
    const item: TPro = {
      _id: product._id,
      name: product.name,
      unitPrice: product.unitPrice,
      attachment: product.attachment,
      remainder: product.remainder,
      tagIds: product.tagIds,
      code: product.code,
    };
    addProduct(item);
  }, [product, addProduct]);

  const [loading, addToCart] = useAtom(addToCartAtom);

  const onAddToCart = () => {
    if (reminder < count) {
      toast.error(`${count}ш үлдэгдэлээс давсан байна.`);
      return;
    }
    const item: TProduct = {
      _id: product._id,
      name: product.name,
      unitPrice: product.unitPrice,
      attachment: product.attachment,
    };
    addToCart({ ...item, count });
    setCount(1);
    refetch();
    refetchOrderItems();
  };

  const onBuy = () => {
    if (!orderItems.includes((item: any) => item.id === product._id)) {
      const item: TProduct = {
        _id: product._id,
        name: product.name,
        unitPrice: product.unitPrice,
        attachment: product.attachment,
      };
      addToCart({ ...item, count });
      setCount(1);
      refetch();
      refetchOrderItems();
    }

    router.push("/cart");
  };

  const branchLookup = branches.reduce(
    (
      acc: { [x: string]: any },
      branch: {
        address: any;
        code: string | number;
        title: any;
        coordinate: { latitude: number; longitude: number };
        image: IAttachment;
      },
    ) => {
      acc[branch.code] = {
        title: branch.title,
        coordinate: branch.coordinate,
        address: branch.address,
        image: branch.image,
      };
      return acc;
    },
    {},
  );

  const branchDetails = product.remainders
    ?.filter((item: any) => item?.remainder !== 0)
    ?.map((item: any) => {
      const branch = branchLookup[item.location];
      return branch
        ? {
            title: branch.title,
            coordinate: branch.coordinate,
            address: branch.address,
            image: branch.image,
            reminder: item.remainder,
          }
        : null;
    });

  const total = useMemo(() => {
    return (
      (orderItems?.find((item: any) => item.id === product._id)?.count || 0) +
      count
    );
  }, [count, orderItems, product]);

  const availableAddCart =
    product?.tagIds.includes("2znBi5xWhERHPAtBXDLEy") &&
    reminder > total - count &&
    (!loadingReminder || !loadingOrderItems);

  const out =
    product?.tagIds?.includes("2znBi5xWhERHPAtBXDLEy") &&
    reminder <= total - count &&
    (!loadingReminder || !loadingOrderItems);

  return (
    <div className="grid w-full gap-6 md:grid-cols-2 lg:grid-cols-5 2xl:grid-cols-3">
      <ProductBreadcrumbs
        catId={product.category?._id!}
        catName={product.category?.name!}
        name={product.name}
      />

      <div className="relative col-span-1 aspect-square rounded-xl bg-gray-100 lg:col-span-2 2xl:col-span-1">
        <Image
          src={product.attachment?.url}
          qualityWidth="2000"
          alt="product detail image"
          className="rounded-xl object-cover object-center"
          draggable={false}
        />
      </div>

      <div className="col-span-1 lg:col-span-3 2xl:col-span-2">
        <div className="w-full space-y-6 lg:max-w-[550px]">
          <div>
            <p className="text-xl font-medium text-gray-800 md:text-2xl">
              {product.name}
            </p>
            <p className="font-medium text-gray-500">{product.shortName}</p>
          </div>

          <p>
            <span className="font-medium">Барааны код:</span> {product.code}
          </p>

          <Separator className="bg-gray-300" />

          <div>
            Таны сонгосон бараа:
            <span className="ml-2 rounded-full bg-primary px-2 py-1 font-medium text-white">
              {product.remainder === 0
                ? "Үлдэгдэлгүй байна"
                : product.remainder > 10
                  ? "Үлдэгдэл байна"
                  : `${product.remainder}ш`}
            </span>
          </div>

          {branchDetails?.length > 0 && (
            <div className="space-y-2">
              <p className="font-medium text-gray-900">Борлуулах салбар:</p>

              <ul>
                {branchDetails?.map((item: any) => (
                  <li className="pl-3" key={item.title}>
                    {item.title} :{" "}
                    <span className="text-primary">{item.reminder}ш</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <Separator className="bg-gray-300" />

          <div className="w-full space-y-1">
            <div className="flex w-full justify-between">
              <p className="text-lg">Үнэ:</p>

              <p className="text-lg font-medium">
                {new Intl.NumberFormat(undefined, {
                  style: "currency",
                  currency: "MNT",
                  currencyDisplay: "narrowSymbol",
                }).format(product.unitPrice)}
              </p>
            </div>
          </div>

          <div className="flex w-full flex-col justify-between gap-y-3 sm:flex-row md:flex-col lg:flex-row">
            {availableAddCart && (
              <div className="flex items-center gap-x-2">
                <Minus
                  className="size-5 cursor-pointer"
                  onClick={() =>
                    setCount((prev) => (prev === 1 ? prev : prev - 1))
                  }
                />
                <p className="flex size-10 items-center justify-center rounded-[4px] border border-gray-200 font-medium">
                  {count}
                </p>
                <Plus
                  className="size-5 cursor-pointer"
                  onClick={() => setCount((prev) => prev + 1)}
                />
              </div>
            )}

            {availableAddCart && (
              <div className="flex items-center justify-end gap-x-5">
                <Button
                  variant={"outline"}
                  disabled={loading}
                  onClick={onAddToCart}
                  className="w-[150px]"
                >
                  Сагсанд нэмэх
                </Button>
                <Button
                  disabled={loading}
                  onClick={onBuy}
                  className="w-[150px]"
                >
                  Худалдан авах
                </Button>
              </div>
            )}

            {out && (
              <Button
                variant={"outline"}
                disabled={loading}
                onClick={onAddToCart}
                className="w-[200px]"
              >
                Үлдэгдэл дууссан байна.
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

interface ProductBreadcrumbsProps {
  name: string;
  catId: string;
  catName: string;
}
const ProductBreadcrumbs = ({
  name,
  catId,
  catName,
}: ProductBreadcrumbsProps) => {
  const router = useRouter();

  return (
    <div className="col-span-1 mb-4 flex w-full flex-wrap items-center gap-x-1 md:col-span-2 lg:col-span-5 2xl:col-span-3">
      <p
        className="cursor-pointer font-medium text-primary"
        onClick={() => router.push("/primart")}
        // onClick={() => router.push("/products")}
      >
        Бараанууд
      </p>
      <ChevronRight className="size-4 text-primary" />
      <p
        className="cursor-pointer font-medium text-primary"
        onClick={() => router.push(`/primart?catId=${catId}`)}
        // onClick={() => router.push(`/products?catId=${catId}`)}
      >
        {catName}
      </p>
      <ChevronRight className="size-4" />
      <p className="font-medium">{name}</p>
    </div>
  );
};
