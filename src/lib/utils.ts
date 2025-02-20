import { type ClassValue, clsx } from "clsx";
import type { ReadonlyURLSearchParams } from "next/navigation";
import { twMerge } from "tailwind-merge";
import { type ApolloError } from "@apollo/client";
import { toast } from "sonner";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const timeout = async (delay?: number) => {
  await new Promise((resolve) => setTimeout(resolve, delay ? delay : 1000));
};

export const createUrl = (
  pathname: string,
  params: URLSearchParams | ReadonlyURLSearchParams,
) => {
  const paramsString = params.toString();
  const queryString = `${paramsString.length ? "?" : ""}${paramsString}`;

  return `${pathname}${queryString}`;
};

export const READ_FILE = "/read-file?key=";
export const ERXES_SASS = "erxes-saas/";

export const readFile = (url: string = "", width?: string): string => {
  return `${process.env.ERXES_API_URL}/read-file?key=${url}&width=${width ? width : "400"}`;
};

export const posReadFile = (url: string = "", width?: string) => {
  if (url.startsWith(ERXES_SASS)) {
    return process.env.ERXES_API_URL + READ_FILE + url + width
      ? `&width=${width}`
      : "&width=400";
  }

  if (url.includes(READ_FILE)) {
    const apiUrl = url.split(READ_FILE)[0];
    return url.replace(apiUrl, process.env.ERXES_API_URL || "");
  }

  return url;
};

export const onError = (error: ApolloError) =>
  toast.error("Алдаа гарлаа!", { description: error.message });
