"use client";

import { Fragment, useEffect, useState } from "react";
import Image from "next/image";
import { useAtom } from "jotai";
import { cn } from "@/lib/utils";

import { isOpenAtom } from "@/features/auth/store/auth";
import { useCurrentUser } from "@/hooks/use-current-user";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { RegisterForm } from "./register-form";
import { LoginForm } from "./login-form";
import ForgotForm from "./forgot-form";
import { AuthGoogle } from "./auth-google";

export const AuthModal = () => {
  const { currentUser } = useCurrentUser();

  const [variant, setVariant] = useState<
    "login" | "register" | "forgot-password"
  >("login");

  const [isOpen, setIsOpen] = useAtom(isOpenAtom);

  useEffect(() => {
    if (currentUser) {
      setIsOpen(false);
    }
  }, [setIsOpen, currentUser]);

  return (
    <Fragment>
      <Dialog
        open={isOpen}
        onOpenChange={(value) => {
          setIsOpen(value);
          setVariant("login");
        }}
      >
        <DialogContent
          className={cn(
            "grid w-[calc(100%-20px)] overflow-hidden rounded-md p-0 sm:w-[430px] lg:w-[940px] lg:max-w-[940px] lg:grid-cols-10",
          )}
        >
          <div
            className={cn(
              "relative hidden h-fit lg:col-span-6 lg:flex",
              variant === "login" ? "aspect-[7/7]" : "aspect-[9/10]",
            )}
          >
            <Image
              fill
              src={
                variant === "register"
                  ? "/assets/auth/register-bg.svg"
                  : "/assets/auth/login-bg.svg"
              }
              alt={
                variant === "register"
                  ? "Register Background"
                  : "Login Background"
              }
              className="object-cover object-center"
              draggable={false}
            />
          </div>

          {variant === "register" && (
            <RegisterForm variant={variant} setVariant={setVariant} />
          )}
          {variant === "login" && (
            <LoginForm variant={variant} setVariant={setVariant} />
          )}
          {variant === "forgot-password" && (
            <ForgotForm variant={variant} setVariant={setVariant} />
          )}
        </DialogContent>
      </Dialog>

      <AuthGoogle />
    </Fragment>
  );
};
