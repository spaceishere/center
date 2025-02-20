"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSetAtom } from "jotai";
import { useLogin } from "../api/auth";

import { isOpenAtom } from "@/features/auth/store/auth";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Wrapper } from "./wrapper";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useAddress } from "@/features/auth/store/use-address";

import { LoginSchema, TLoginSchema } from "@/features/auth/schema";

import { Eye, EyeOff } from "lucide-react";

export const LoginForm = ({
  variant,
  setVariant,
}: {
  variant: "login" | "register" | "forgot-password";
  setVariant: (variant: "login" | "register" | "forgot-password") => void;
}) => {
  const [isShowPassword, setIsShowPassword] = useState<boolean>(false);

  const { address, setAddress } = useAddress();

  const setIsOpen = useSetAtom(isOpenAtom);

  const { login, loading: isPending, clientPortalId } = useLogin();

  const form = useForm<TLoginSchema>({
    resolver: zodResolver(LoginSchema),

    defaultValues: {
      login: address ? address : "",
      password: "",
      isRemember: address ? true : false,
    },
  });

  const onSubmit = (values: TLoginSchema) => {
    login({
      variables: { ...values, clientPortalId },
      onCompleted: () => {
        setIsOpen(false);
        form.reset();
        if (values.isRemember) {
          setAddress(values.login);
        }
      },
    });
  };

  return (
    <Wrapper
      title={"Нэвтрэх"}
      variant={variant}
      setVariant={setVariant}
      formTarget="login-form"
      isPending={isPending}
    >
      <Form {...form}>
        <form
          id="login-form"
          onSubmit={form.handleSubmit((e) => onSubmit(e))}
          className="grid grid-cols-2 gap-4"
        >
          <FormField
            name="login"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Утасны дугаар"
                    disabled={isPending}
                    className="w-full px-4 py-[14px]"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="password"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormControl>
                  <div className="w-full">
                    <p
                      className="cursor-pointer pb-2 pr-1 text-right text-[13px] leading-3 text-primary underline"
                      onClick={() => setVariant("forgot-password")}
                    >
                      Нууц үгээ мартсан уу?
                    </p>

                    <div className="relative">
                      <Input
                        {...field}
                        placeholder="Нууц үг"
                        disabled={isPending}
                        className="w-full px-4 py-[14px] pr-10"
                        type={isShowPassword ? "text" : "password"}
                      />
                      <div className="absolute right-3 top-2">
                        {isShowPassword ? (
                          <EyeOff
                            className="size-6 text-primary"
                            onClick={() => setIsShowPassword((prev) => !prev)}
                          />
                        ) : (
                          <Eye
                            className="size-6 text-primary"
                            onClick={() => setIsShowPassword((prev) => !prev)}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="isRemember"
            render={({ field }) => (
              <FormItem className="col-span-2 flex w-full items-center gap-x-2 pb-2">
                <FormControl>
                  <Checkbox
                    className="h-5 w-5"
                    checked={field.value}
                    onCheckedChange={(checked) => {
                      field.onChange(checked);
                    }}
                  />
                </FormControl>
                <FormLabel className="pb-2">Намайг сана</FormLabel>
              </FormItem>
            )}
          />
        </form>
      </Form>
    </Wrapper>
  );
};
