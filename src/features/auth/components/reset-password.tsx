"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useSearchParams } from "next/navigation";

import { useResetPassword } from "../api/auth";

import { Password } from "@/components/ui/password";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { LoadingIcon } from "@/components/ui/loading";
import { CheckCircle2Icon, XCircleIcon } from "lucide-react";

import {
  ChangePasswordSchema,
  TChangePasswordSchema,
} from "@/features/auth/schema";

const ResetPasswordForm = () => {
  const token = useSearchParams().get("token");

  const form = useForm<TChangePasswordSchema>({
    resolver: zodResolver(ChangePasswordSchema),
    defaultValues: {
      token: token || "",
      password: "",
    },
  });

  const { loading, resetPassword, clientPortalId, success } =
    useResetPassword();

  function onSubmit(values: TChangePasswordSchema) {
    resetPassword({
      variables: { newPassword: values.password, clientPortalId, token },
    });
  }

  if (!token) {
    return (
      <div className="flex flex-col items-center">
        <XCircleIcon
          className="h-12 w-12 animate-pulse text-red-500"
          strokeWidth={1.5}
        />
        <p className="my-1 text-center text-base font-medium">Буруу холбоос</p>
        <p className="text-sm text-neutral-500">Та имэйл хаяг aa шалгана уу.</p>
      </div>
    );
  }

  if (success) {
    return (
      <div className="flex flex-col items-center">
        <CheckCircle2Icon
          className="h-12 w-12 animate-bounce text-green-500"
          strokeWidth={1.5}
        />
        <p className="my-1 text-center text-base font-medium">
          Таны нууц үг амжилттай шинэчлэгдлээ
        </p>
        <p className="text-sm text-neutral-500">
          Та нэвтэрч ороод үргэлжлүүлнэ үү.
        </p>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form
        className="relative space-y-4"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>New Password</FormLabel>
              <FormControl>
                <Password {...field} autoComplete="password" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="col-span-2 w-full" size="lg" disabled={loading}>
          {loading && <LoadingIcon />}
          Нууц үг шинэчлэх
        </Button>
      </form>
    </Form>
  );
};

export default ResetPasswordForm;
