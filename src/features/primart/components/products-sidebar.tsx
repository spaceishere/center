"use client";

import qs from "query-string";
import { cn } from "@/lib/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import {
  Check,
  ChevronDown,
  ChevronRight,
  ChevronUp,
  Loader2,
} from "lucide-react";
import { useCategories } from "../api/useCategories";
import { useCatOpen } from "../store/useCatOpen";
import {
  useCatProductsCount,
  useLazyProductsCount,
} from "../api/useProductsCount";
import { useState } from "react";

interface ProductsSidebarProps {
  className?: string;
  totalCount: number;
}

export const ProductsSidebar = ({
  className,
  totalCount,
}: ProductsSidebarProps) => {
  const [enteredCat, setEnteredCat] = useState<string | undefined>();

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const q = searchParams.get("p") || undefined;
  const catId = searchParams.get("catId") || undefined;

  const { count: enteredCount, loading: enteredLoading } = useLazyProductsCount(
    enteredCat,
    q,
  );
  const { count: catCount, loading: catLoading } = useCatProductsCount(
    catId,
    q,
  );

  const categories = useCategories();

  const { onClose } = useCatOpen();

  const onEnterCat = (categoryId: string) => {
    setEnteredCat(categoryId);
  };

  const onClickCat = (id: string, isParent?: boolean) => {
    let currentQuery = {};

    if (searchParams) {
      currentQuery = qs.parse(searchParams.toString());
    }

    let updatedQuery: any = {
      ...currentQuery,
      catId: catId === id ? "" : id,
      page: undefined,
    };

    const url = qs.stringifyUrl(
      {
        url: pathname,
        query: updatedQuery,
      },
      { skipNull: true, skipEmptyString: true },
    );

    router.replace(url + "#primart-products");
    if (!isParent) {
      onClose();
    }
  };

  return (
    <div
      className={cn(
        className
          ? className
          : "sticky top-[162px] hidden w-[290px] min-w-[290px] pl-5 lg:block",
      )}
    >
      <div className="space-y-5">
        <div className="space-y-5 px-1">
          {categories.map((parentCat, index) => (
            <div className="space-2 w-full" key={index}>
              <div className="flex w-full items-center justify-between">
                <p className="line-clamp-1 text-lg font-medium">
                  {parentCat.name}
                </p>

                {!catId && (
                  <p className="text-[14px] font-medium text-primary">
                    {totalCount}
                  </p>
                )}
              </div>
              <div className="w-full pl-2">
                {parentCat.categories.map((cat, index) => {
                  const isInSubCats = cat.subCategories.some(
                    (subCat) => subCat._id === catId,
                  );
                  const isThisCat = catId === cat._id;
                  const isShow = isInSubCats || isThisCat;
                  return (
                    <div className="space-2 w-full py-[2px]" key={index}>
                      <div
                        className={cn(
                          "flex w-full cursor-pointer items-center gap-x-2 rounded-md px-1 py-1.5",
                          cat._id !== catId &&
                            "transition-colors duration-200 hover:bg-gray-100/80",
                        )}
                        onClick={() => onClickCat(cat._id, true)}
                        onMouseEnter={() => onEnterCat(cat._id)}
                        onMouseLeave={() => setEnteredCat(undefined)}
                      >
                        <div
                          className={cn(
                            "flex size-5 items-center justify-center overflow-hidden rounded-[6px] border border-gray-300",
                            catId === cat._id && "border-primary bg-primary/10",
                          )}
                        >
                          {catId === cat._id && (
                            <Check className="size-[16px] text-primary" />
                          )}
                        </div>

                        <p className="line-clamp-1 text-wrap">{cat.name}</p>

                        {isThisCat ? (
                          catLoading ? (
                            <Loader2 className="size-5 animate-spin" />
                          ) : (
                            <p className="ml-auto text-[14px] font-medium text-primary">
                              {catCount}
                            </p>
                          )
                        ) : isShow ? (
                          <ChevronUp className="ml-auto size-5" />
                        ) : enteredCat === cat._id ? (
                          <p className="ml-auto text-[14px] font-medium text-primary">
                            {enteredCount}
                          </p>
                        ) : (
                          <ChevronRight className="ml-auto size-5" />
                        )}
                      </div>

                      {isShow && (
                        <div className="space-3 w-full pl-4">
                          {cat.subCategories.map((subCat, index) => (
                            <div
                              className={cn(
                                "flex w-full cursor-pointer items-center gap-x-2 rounded-md px-1 py-1.5",
                                subCat._id !== catId &&
                                  "transition-colors duration-200 hover:bg-gray-100/80",
                              )}
                              key={index}
                              onClick={() => onClickCat(subCat._id)}
                              onMouseEnter={() => onEnterCat(subCat._id)}
                              onMouseLeave={() => setEnteredCat(undefined)}
                            >
                              <div
                                className={cn(
                                  "flex size-5 items-center justify-center overflow-hidden rounded-[6px] border border-gray-300",
                                  catId === subCat._id &&
                                    "border-primary bg-primary/10",
                                )}
                              >
                                {catId === subCat._id && (
                                  <Check className="size-[16px] text-primary" />
                                )}
                              </div>

                              <p className="line-clamp-1 text-muted-foreground">
                                {subCat.name}
                              </p>

                              {subCat._id === catId && (
                                <p className="ml-auto text-[14px] font-medium text-primary">
                                  {catCount}
                                </p>
                              )}

                              {subCat._id !== catId ? (
                                subCat._id === enteredCat ? (
                                  enteredLoading ? (
                                    <Loader2 className="size-5 animate-spin" />
                                  ) : (
                                    <p className="ml-auto text-[14px] font-medium text-primary">
                                      {enteredCount ?? 0}
                                    </p>
                                  )
                                ) : undefined
                              ) : undefined}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
