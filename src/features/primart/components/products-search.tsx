"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";

import { useCatOpen } from "../store/useCatOpen";

import { AlignJustify, Search } from "lucide-react";

interface ProductsSearchProps {
  q?: string;
}

export const ProductsSearch = ({ q }: ProductsSearchProps) => {
  const { onOpen } = useCatOpen();

  const inputRef = useRef<HTMLInputElement | null>(null);
  const [value, setValue] = useState<string>(q || "");

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const onSearch = () => {
    let currentQuery = {};

    if (searchParams) {
      currentQuery = qs.parse(searchParams.toString());
    }

    let updatedQuery: any = {
      ...currentQuery,
      q: value,
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
  };

  const onClick = () => {
    if (inputRef.current) {
      inputRef?.current?.focus();
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      onSearch();
    }, 300);

    return () => {
      clearTimeout(timeout);
    };
  }, [value]);

  return (
    <div className="flex h-[50px] w-full items-center gap-x-4">
      <div
        className="group flex aspect-square h-full cursor-pointer items-center justify-center rounded-md border transition duration-200 hover:bg-gray-50 lg:hidden"
        onClick={onOpen}
      >
        <AlignJustify size={28} />
      </div>

      <div
        className="group relative h-12 w-full cursor-pointer pr-[50px]"
        onClick={onClick}
      >
        <div className="h-full flex-1 rounded-[10px] rounded-r-none border">
          <input
            placeholder="Search..."
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="h-full w-full rounded-[10px] rounded-r-none pl-5 text-lg text-primary focus-visible:outline-none focus-visible:ring-0"
            ref={inputRef}
          />
        </div>
        <div
          className="absolute right-0 top-0 flex h-12 w-[50px] items-center justify-center rounded-[10px] rounded-l-none bg-primary text-white transition duration-200 group-hover:bg-primary/80"
          onClick={onSearch}
        >
          <Search />
        </div>
      </div>
    </div>
  );
};
