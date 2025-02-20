"use client";

import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";

import { useMutation } from "@apollo/client";
import { mutations } from "@/gql/user";
import { GivePointSchema, TGivePointSchema } from "@/features/profile/schema";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { X } from "lucide-react";

interface SendPointProps {
  userId: string;
  setGivePoinstOpen: (open: boolean) => void;
  totalScore: number;
}

export const SendPoint = ({
  userId,
  setGivePoinstOpen,
  totalScore,
}: SendPointProps) => {
  const [isPending, startTransition] = useTransition();

  const [shareScore] = useMutation(mutations.shareScore, {
    onError: (error) => {
      if (error.message.includes("customer not found")) {
        toast.error("Илгээх хэрэглэгч олдсонгүй");
      }
      if (error.message.includes("score are not enough")) {
        toast.info("Таны оноо энэ үйлдэлийг хийхэд хүрэхгүй байна.");
      }
    },
  });

  const form = useForm<TGivePointSchema>({
    resolver: zodResolver(GivePointSchema),

    defaultValues: {
      login: "",
      score: "0",
    },
  });

  const onTransferPoint = (values: TGivePointSchema) => {
    startTransition(async () => {
      try {
        const { login } = form.getValues();
        if (!login) {
          toast.info("Энэ үйлчилгээ нь одоохондоо ашиглалтанд ороогүй байна.");
          return;
        }

        const score = parseFloat(values.score);

        if (score === 0) {
          toast.info("Багадаа 1 оноо.");
          return;
        }

        if (score > totalScore) {
          toast.info("Таны оноо энэ үйлдэлийг хийхэд хүрэхгүй байна.");
          return;
        }

        const isEmail = login.includes("@");

        await shareScore({
          variables: {
            ownerType: "customer",
            ownerId: userId,
            destinationPhone: !isEmail ? values.login : undefined,
            destinationEmail: isEmail ? values.login : undefined,
            score: parseFloat(values.score),
          },
        });

        form.reset();
        setGivePoinstOpen(false);
      } catch (error) {
        toast.error("Алдаа гарлаа");
      }
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onTransferPoint)}
        className="w-full space-y-3 py-5"
      >
        <FormField
          name="login"
          control={form.control}
          render={({ field }) => (
            <FormItem className="w-full space-y-1">
              <p className="text-sm font-medium text-muted-foreground">
                имэйл эсвэл утасны дугаар
              </p>
              <FormControl>
                <Input
                  {...field}
                  placeholder="john@doe.com | 93939393"
                  disabled={isPending}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="score"
          control={form.control}
          render={({ field }) => (
            <FormItem className="w-full space-y-1">
              <p className="text-sm font-medium text-muted-foreground">
                Онооны хэмжээ
              </p>
              <FormControl>
                <Input
                  {...field}
                  type="number"
                  placeholder="10000"
                  disabled={isPending}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex items-center gap-x-3">
          <Button className="flex-1" type="submit" disabled={isPending}>
            Оноо илгээх
          </Button>
          <Button
            size={"icon"}
            variant={"outline"}
            onClick={() => {
              setGivePoinstOpen(false);
              form.reset();
            }}
            disabled={isPending}
          >
            <X className="size-5" />
          </Button>
        </div>
      </form>
    </Form>
  );
};
