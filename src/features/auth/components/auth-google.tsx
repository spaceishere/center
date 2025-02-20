"use client";

import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useGoogleLogin } from "../api/auth";
import qs from "query-string";

export const AuthGoogle = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const onGoogleError = () => {
    let currentQuery = {};

    if (searchParams) {
      currentQuery = searchParams;
    }

    let updatedQuery: any = {
      ...currentQuery,
      code: null,
    };

    const url = qs.stringifyUrl(
      {
        url: pathname,
        query: updatedQuery as any,
      },
      {
        skipNull: true,
        skipEmptyString: true,
      },
    );

    router.replace(url);
  };

  const { googleLogin, clientPortalId } = useGoogleLogin(onGoogleError);

  const code = useSearchParams().get("code");

  useEffect(() => {
    if (code) {
      googleLogin({
        variables: {
          code,
          clientPortalId,
        },
      });
    }
  }, [code, googleLogin, pathname, router, searchParams, clientPortalId]);

  return null;
};
