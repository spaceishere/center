"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";

import { cn } from "@/lib/utils";

import { ChevronLeft, ChevronRight } from "lucide-react";

interface ProductsPaginationProps {
  pageCount: number;
  page: number;
}

export const ProductsPagination = ({
  pageCount,
  page,
}: ProductsPaginationProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const isUnder6 = pageCount < 6;
  const isLast3 = page > pageCount - 3;
  const isFirst3 = page < 4;
  const isFive = isUnder6 || isLast3 || isFirst3;

  const onClick = (pg: number) => {
    if (pg < 1 || pg > pageCount) return;
    let currentQuery = {};

    if (searchParams) {
      currentQuery = qs.parse(searchParams.toString());
    }

    let updatedQuery: any = {
      ...currentQuery,
      page: pg,
    };

    const url = qs.stringifyUrl(
      {
        url: pathname,
        query: updatedQuery,
      },
      { skipNull: true, skipEmptyString: true },
    );

    router.replace(url + `#primart-products`);
  };

  if (pageCount < 1) {
    return;
  }

  return (
    <div className="flex w-full justify-center sm:gap-x-2">
      <div
        className={cn(
          "grid grid-cols-7 sm:gap-x-2",
          isFive && !isUnder6 && "grid-cols-8",
          !isFive && "grid-cols-9",
        )}
      >
        <button
          disabled={page === 1}
          className={cn(
            "order-first col-span-1 flex size-10 cursor-pointer items-center justify-center rounded-xl transition-colors duration-200 sm:size-12 sm:text-lg",
            page !== 1 && "hover:bg-gray-100",
          )}
          onClick={() => onClick(page - 1)}
        >
          <ChevronLeft
            className={cn("text-primary", page === 1 && "text-gray-500")}
          />
        </button>

        {!isFive && !isUnder6 && !isLast3 && (
          <div
            className="order-1 flex size-10 cursor-pointer items-center justify-center rounded-xl text-lg font-medium leading-[18px] text-black transition-colors duration-200 hover:bg-primary/30 sm:size-12 sm:text-lg"
            onClick={() => onClick(1)}
          >
            1
          </div>
        )}

        {new Array(pageCount < 5 ? pageCount : 5).fill("").map((_, index) => (
          <div
            key={index}
            className={cn(
              `flex size-10 cursor-pointer items-center justify-center rounded-xl font-medium leading-[18px] text-black transition-colors duration-200 hover:bg-primary/30 sm:size-12 sm:text-lg`,
              (isFive
                ? isFirst3
                  ? index + 1
                  : isLast3 && pageCount - (5 - index - 1)
                : index === 0 || index === 4
                  ? "..."
                  : index === 1
                    ? page - 1
                    : index === 2
                      ? page
                      : page + 1) === page &&
                "border-[1.5px] border-primary text-primary hover:bg-gray-100",
              !isFive && (index === 0 || index === 4) && "hover:bg-white",
              index === 0 && "order-3",
              index === 1 && "order-5",
              index === 2 && "order-7",
              index === 3 && "order-9",
              index === 4 && "order-11",
            )}
            onClick={() =>
              onClick(
                isFive
                  ? isFirst3
                    ? index === 4
                      ? pageCount
                      : index + 1
                    : isLast3
                      ? index === 0
                        ? 1
                        : pageCount - (5 - index - 1)
                      : 0
                  : index === 0 || index === 4
                    ? 0
                    : index === 1
                      ? page - 1
                      : index === 2
                        ? page
                        : page + 1,
              )
            }
          >
            {isFive
              ? isFirst3
                ? index === 4
                  ? pageCount
                  : index + 1
                : isLast3 && index === 0
                  ? 1
                  : pageCount - (5 - index - 1)
              : index === 0 || index === 4
                ? "..."
                : index === 1
                  ? page - 1
                  : index === 2
                    ? page
                    : page + 1}
          </div>
        ))}

        {!isFive && !isUnder6 && !isLast3 && (
          <div
            className="order-[19] flex size-10 cursor-pointer items-center justify-center rounded-xl text-lg font-medium leading-[18px] text-black transition-colors duration-200 hover:bg-primary/30 sm:size-12 sm:text-lg"
            onClick={() => onClick(pageCount)}
          >
            {pageCount}
          </div>
        )}

        {(isLast3 || isFirst3) && !isUnder6 && (
          <div
            className={cn(
              "flex size-10 items-center justify-center text-lg font-medium sm:size-12",
              isLast3 && "order-4",
              isFirst3 && "order-10",
            )}
          >
            ...
          </div>
        )}

        <button
          disabled={pageCount <= page}
          className={cn(
            "order-[20] flex size-10 cursor-pointer items-center justify-center rounded-xl transition-colors duration-200 sm:size-12 sm:text-lg",
            page < pageCount && "hover:bg-gray-100",
          )}
          onClick={() => onClick(page + 1)}
        >
          <ChevronRight
            className={cn("text-primary", pageCount <= page && "text-gray-500")}
          />
        </button>
      </div>
    </div>
  );
};
