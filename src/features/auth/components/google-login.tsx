"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const GoogleLogin = ({ isPending }: { isPending: boolean }) => {
  const [domain, setDomain] = useState("");
  const pathname = usePathname();

  useEffect(() => {
    const currentDomain = window.location.hostname;
    setDomain(currentDomain);
  }, []);

  const getGoogleUrl = (from: string) => {
    const rootUrl = `https://accounts.google.com/o/oauth2/v2/auth`;
    const options = {
      redirect_uri: `${domain === "localhost" ? `https://${domain}:8080` : `https://${domain}`}`,
      client_id: process.env.NEXT_PUBLIC_GOOGLE_ID || "",
      access_type: "offline",
      response_type: "code",
      prompt: "consent",
      scope: [
        "https://www.googleapis.com/auth/userinfo.profile",
        "https://www.googleapis.com/auth/userinfo.email",
      ].join(" "),
      state: from,
    };

    const qs = new URLSearchParams(options);
    return `${rootUrl}?${qs.toString()}`;
  };

  return (
    <Button
      size="lg"
      disabled={isPending}
      className="h-12 w-full bg-red-700 text-white hover:bg-red-700/90 hover:text-white"
      variant="outline"
      asChild
    >
      <Link href={getGoogleUrl(pathname)}>
        <GoogleIcon />
        Google-ээр нэвтрэх
      </Link>
    </Button>
  );
};

const GoogleIcon = () => (
  <svg
    strokeWidth="0"
    viewBox="0 0 488 512"
    className="-ml-1 mr-2 h-3 w-3 fill-white stroke-[1.5px]"
    height="1em"
    width="1em"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path>
  </svg>
);

export default GoogleLogin;
