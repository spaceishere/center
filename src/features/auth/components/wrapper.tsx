"use client";

import { Button } from "@/components/ui/button";
import { Social } from "./social";

interface WrapperProps {
  title: string;
  variant: "login" | "register" | "forgot-password";
  setVariant: (variant: "login" | "register" | "forgot-password") => void;
  onSubmit?: <T>(data: T) => void;
  children: React.ReactNode;
  formTarget: "login-form" | "register-form";
  isPending: boolean;
}

export const Wrapper = ({
  title,
  variant,
  setVariant,
  children,
  formTarget,
  isPending,
}: WrapperProps) => {
  return (
    <div className="col-span-1 flex flex-col gap-y-8 p-6 lg:col-span-4">
      <div className="space-y-4">
        <p className="text-2xl font-medium text-gray-800">{title}</p>

        {children}

        {variant !== "forgot-password" && (
          <>
            <Button
              disabled={isPending}
              className="h-12 w-full"
              form={formTarget}
              type="submit"
            >
              {variant === "login" ? "Нэвтрэх" : "Бүртгүүлэх"}
            </Button>

            <Button
              disabled={isPending}
              variant={"ghost"}
              className="h-12 w-full text-primary"
              type="button"
              onClick={() =>
                setVariant(variant === "login" ? "register" : "login")
              }
            >
              {variant === "login" ? "Бүртгүүлэх" : "Нэвтрэх"}
            </Button>
          </>
        )}
      </div>

      {variant !== "forgot-password" && <Social />}
    </div>
  );
};
