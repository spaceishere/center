"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { useRegister } from "../api/auth";

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

import { RegisterSchema, TRegisterSchema } from "@/features/auth/schema";

import { Eye, EyeOff } from "lucide-react";

export const RegisterForm = ({
  variant,
  setVariant,
}: {
  variant: "login" | "register" | "forgot-password";
  setVariant: (variant: "login" | "register" | "forgot-password") => void;
}) => {
  const [isShowPassword, setIsShowPassword] = useState<boolean>(false);

  const { register, loading: isPending, clientPortalId } = useRegister();

  const form = useForm<TRegisterSchema>({
    resolver: zodResolver(RegisterSchema),

    defaultValues: {
      phone: "",
      firstName: "",
      lastName: "",
      password: "",
      access: false,
    },
  });

  const onSubmit = (values: TRegisterSchema) => {
    if (values.access === false) {
      form.setError("access", {
        message: "Та Үйлчилгээг зөвшөөрсөн тохиолдолд бүртгэх боломжтой!",
      });
      return;
    }

    register({
      variables: { clientPortalId, ...values },
      onCompleted: () => {
        toast.success("Congratulations, You registered successfully", {
          description: "Таны имэйл рүү баталгаажуулах холбоос илгээлээ.",
        });

        setVariant("login");
      },
    });
  };

  return (
    <Wrapper
      title={"Бүртгүүлэх"}
      variant={variant}
      setVariant={setVariant}
      formTarget="register-form"
      isPending={isPending}
    >
      <Form {...form}>
        <form
          id="register-form"
          onSubmit={form.handleSubmit((e) => onSubmit(e))}
          className="grid grid-cols-2 gap-4"
        >
          <FormField
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Нэр"
                    disabled={isPending}
                    className="w-full px-4 py-[14px]"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Овог"
                    disabled={isPending}
                    className="w-full px-4 py-[14px]"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="phone"
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
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="access"
            render={({ field }) => (
              <FormItem className="col-span-2 space-y-1 pb-2">
                <div className="flex w-full items-center gap-x-2">
                  <FormControl>
                    <Checkbox
                      className="h-5 w-5"
                      checked={field.value}
                      onCheckedChange={(checked) => {
                        field.onChange(checked);
                      }}
                    />
                  </FormControl>
                  <FormLabel className="pb-2">Үйлчилгээг зөвшөөрөх</FormLabel>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </Wrapper>
  );
};
