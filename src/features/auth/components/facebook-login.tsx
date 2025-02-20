import { Button } from "@/components/ui/button";
import { LoadingIcon } from "@/components/ui/loading";
import { FacebookIcon } from "lucide-react";
import Script from "next/script";
import React, { useEffect, useState } from "react";
import { fbLogin, initFacebookSdk } from "@/lib/facebook";

export const FacebookLoginComponent = ({
  onSuccess,
  isPending,
}: {
  isPending: boolean;
  onSuccess: (res: any) => void;
}) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    initFacebookSdk();
  }, []);

  function login() {
    fbLogin().then((response) => onSuccess(response));
  }

  return (
    <>
      <Script
        src="https://connect.facebook.net/en_US/sdk.js"
        crossOrigin="anonymous"
        async
        strategy="lazyOnload"
        defer
        onReady={() => setLoading(false)}
      />
      <Button
        size="lg"
        className="h-12 w-full bg-[#155EEF] text-primary text-white hover:bg-[#155EEF]/80"
        disabled={isPending || loading}
        onClick={login}
      >
        {isPending || loading ? (
          <LoadingIcon className="text-white" />
        ) : (
          <FacebookIcon className="mr-1 h-5 w-5 fill-white" strokeWidth={0.1} />
        )}
        Facebook-ээр нэвтрэх
      </Button>
    </>
  );
};
