"use client";

import Image from "next/image";
import { useState, useTransition } from "react";
import { useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { mutations } from "@/gql/auth";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SendPoint } from "./send-point";

import { TCustomer } from "@/types";
import { TProfileEditSchema, ProfileEditSchema } from "../schema";

import { FilePenLine } from "lucide-react";

interface ProfileUserDetailProps {
  user: TCustomer;
  totalScore: number;
}

export const ProfileUserDetail = ({
  user,
  totalScore,
}: ProfileUserDetailProps) => {
  const [isPending, startTransition] = useTransition();
  const [givePoinstOpen, setGivePoinstOpen] = useState(false);

  const [editUser] = useMutation(mutations.userEdit);

  const form = useForm<TProfileEditSchema>({
    resolver: zodResolver(ProfileEditSchema),

    defaultValues: {
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      phone: user.phone || "",
    },
  });

  const onSubmit = (values: TProfileEditSchema) => {
    startTransition(async () => {
      const { ...data } = values;
      await editUser({
        variables: {
          _id: user._id,
          ...data,
        },
      });
      toast.success("Хадгаллаа");
    });
  };

  return (
    <div className="flex h-fit w-full flex-col items-center gap-y-4 rounded-md border p-4">
      <p className="flex items-center text-[14px] font-medium text-muted-foreground">
        Хайбрид пойнт:{" "}
        <span className="flex items-center text-primary">
          <Image
            src={"/assets/profile/coin.svg"}
            alt="coin"
            width={24}
            height={24}
          />{" "}
          {totalScore}
        </span>
      </p>

      <div className="relative size-[140px]">
        <Image
          src={"https://avatar.iran.liara.run/public/24"}
          alt="profile"
          className="object-cover object-center"
          draggable={false}
          fill
        />
      </div>

      <div
        onClick={() => setGivePoinstOpen(true)}
        className="flex h-11 w-full cursor-pointer items-center justify-center rounded-[8px] border border-primary transition-colors duration-200 hover:bg-gray-50"
      >
        <Image
          src={"/assets/profile/give-point.svg"}
          alt="plus"
          width={20}
          height={20}
          className="mr-2"
        />
        <p className="font-medium text-primary">Оноо бэлэглэх</p>
      </div>

      {givePoinstOpen && (
        <SendPoint
          userId={user.erxesCustomerId!}
          setGivePoinstOpen={setGivePoinstOpen}
          totalScore={totalScore}
        />
      )}

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-3"
        >
          <FormField
            name="firstName"
            control={form.control}
            render={({ field }) => (
              <FormItem className="relative w-full space-y-0 rounded-xl bg-gray-100 p-1 pt-4">
                <div className="absolute left-4 top-1.5 text-sm font-medium text-muted-foreground">
                  Нэр
                </div>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="John"
                    disabled={isPending}
                    className="w-full min-w-full border-0 text-gray-700 shadow-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="lastName"
            control={form.control}
            render={({ field }) => (
              <FormItem className="relative w-full space-y-0 rounded-xl bg-gray-100 p-1 pt-4">
                <div className="absolute left-4 top-1.5 text-sm font-medium text-muted-foreground">
                  Овог
                </div>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Doe"
                    disabled={isPending}
                    className="focus-visible:ring-ofmin-w-full w-full border-0 text-gray-700 shadow-none focus-visible:ring-0 focus-visible:ring-transparent"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="phone"
            control={form.control}
            render={({ field }) => (
              <FormItem className="relative w-full space-y-0 rounded-xl bg-gray-100 p-1 pt-4">
                <div className="absolute left-4 top-1.5 text-sm font-medium text-muted-foreground">
                  Утасны дугаар
                </div>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="88888888"
                    disabled={isPending}
                    className="focus-visible:ring-ofmin-w-full w-full border-0 text-gray-700 shadow-none focus-visible:ring-0 focus-visible:ring-transparent"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            disabled={isPending}
            variant={"outline"}
            className="flex h-[40px] w-full items-center justify-center gap-x-2 text-primary hover:text-primary"
          >
            <FilePenLine className="size-5" />
            <p>Мэдээлэл засах</p>
          </Button>
        </form>
      </Form>
    </div>
  );
};
