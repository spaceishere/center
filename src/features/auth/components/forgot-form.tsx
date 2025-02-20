"use client";

import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useMutation } from "@apollo/client";
import { toast } from "sonner";

import mutations from "@/gql/auth/mutations";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForgotPassword } from "../api/auth";
import { LoadingIcon } from "@/components/ui/loading";
import { Wrapper } from "./wrapper";

import { ForgotPassSchema, TForgotPassSchema } from "@/features/auth/schema";

const ForgotForm = ({
  variant,
  setVariant,
}: {
  variant: "login" | "register" | "forgot-password";
  setVariant: (variant: "login" | "register" | "forgot-password") => void;
}) => {
  const [phoneVerified, setPhoneVerified] = useState(false);
  const form = useForm<TForgotPassSchema>({
    resolver: zodResolver(ForgotPassSchema),
    defaultValues: {
      phone: "",
      password: "",
      code: "",
    },
  });

  const { loading, forgotPassword, clientPortalId, success } =
    useForgotPassword();

  const [resetPasswordMutation, { loading: loadingReset }] = useMutation(
    mutations.changePasswordWithCode,
    {
      onCompleted: () => {
        setVariant("login");
        toast.success("Нууц үг амжилттай солигдлоо");
      },
      onError: (error) => {
        if (error.message === "Wrong code") {
          toast.error("Код буруу байна");
          return;
        }
      },
    },
  );

  function onSubmit(values: TForgotPassSchema) {
    resetPasswordMutation({
      variables: values,
    });
  }

  const handleSendCode = () => {
    if (form.getFieldState("phone").error) return;

    forgotPassword({
      variables: { phone: form.getValues("phone"), clientPortalId },
    });
  };

  useEffect(() => {
    if (success) {
      toast.success("Код илгээгдлээ");
      setPhoneVerified(true);
    }
  }, [success]);

  return (
    <Wrapper
      title={"Нууц үг сэргээх"}
      variant={variant}
      setVariant={setVariant}
      formTarget="login-form"
      isPending={loading || loadingReset}
    >
      <Form {...form}>
        <form
          className="relative space-y-4"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          {!phoneVerified ? (
            <>
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Утасны дугаар</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="88990123"
                        {...field}
                        autoComplete="email"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                className="col-span-2 w-full"
                size="lg"
                type="button"
                disabled={loading}
                onClick={handleSendCode}
              >
                {loading && <LoadingIcon />}
                Код авах
              </Button>
            </>
          ) : (
            <>
              <FormField
                control={form.control}
                name="code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Код</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="0000" autoComplete="off" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Нууц үг</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="•••••••••••••••"
                        {...field}
                        type="password"
                        autoComplete="off"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                className="col-span-2 w-full"
                size="lg"
                disabled={loading}
                type="submit"
              >
                {loading && <LoadingIcon />}
                Нууц үг сэргээх
              </Button>
            </>
          )}
        </form>
      </Form>
    </Wrapper>
  );
};

export default ForgotForm;
