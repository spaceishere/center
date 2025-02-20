import { z } from "zod";
import { useForm } from "react-hook-form";
import { useAtomValue } from "jotai";
import { currentUserAtom } from "@/features/auth/store/auth";
import { zodResolver } from "@hookform/resolvers/zod";

import BackButton from "./back-button";
import { Button } from "@/components/ui/button";
import { LoadingIcon } from "@/components/ui/loading";
import { DialogFooter } from "@/components/ui/dialog";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";

import { InfoIcon, CheckCircle2Icon } from "lucide-react";
import { REGEXP_ONLY_DIGITS } from "input-otp";

const formSchema = z.object({
  phone: z
    .string()
    .regex(/^\d{8}$/, "Invalid Phone number")
    .min(1, { message: "Phone is required" }),
});

const PhoneDetail = ({
  kind,
  loading,
  handleCreate,
  errorDescription,
  data,
}: {
  kind?: string;
  loading: boolean;
  handleCreate: (values: { phone: string }) => void;
  errorDescription?: string;
  data: {
    apiResponse: {
      error?: string;
      text?: string;
    };
  };
}) => {
  const { phone } = useAtomValue(currentUserAtom) || {};
  const { error, text } = data?.apiResponse || {};

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    values: {
      phone: phone || "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    handleCreate(values);
  }

  if (!error && !errorDescription && text)
    return (
      <div className="flex flex-col items-center gap-4 py-6">
        <CheckCircle2Icon className="h-14 w-14 animate-bounce text-green-500" />
        <Alert variant="default">
          <InfoIcon className="h-4 w-4" />
          <AlertDescription>
            Төлбөрийн нэхэмжлэхийг {kind} -рүү илгээсэн тул та эхний төлөлтөө
            хийж захиалгаа баталгаажуулна уу.
          </AlertDescription>
        </Alert>
      </div>
    );

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex justify-center py-12">
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <InputOTP
                    maxLength={8}
                    pattern={REGEXP_ONLY_DIGITS}
                    {...field}
                  >
                    <InputOTPGroup>
                      {new Array(4).fill("").map((_, index) => (
                        <InputOTPSlot key={index} index={index} />
                      ))}
                    </InputOTPGroup>
                    <InputOTPSeparator />
                    <InputOTPGroup>
                      {new Array(4).fill("").map((_, index) => (
                        <InputOTPSlot key={index} index={index + 4} />
                      ))}
                    </InputOTPGroup>
                  </InputOTP>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {error || errorDescription ? (
          <Alert variant="destructive">
            <InfoIcon className="h-4 w-4 rotate-180" />
            <AlertTitle>Алдаа гарлаа</AlertTitle>
            <AlertDescription className="text-xs">
              {error || errorDescription}
            </AlertDescription>
          </Alert>
        ) : (
          <Alert variant="warning">
            <InfoIcon className="h-4 w-4" />
            <AlertDescription className="text-xs">
              Та <span className="capitalize">{kind}</span>-д бүртгэлтэй утасны
              дугаараа оруулан хүсэлт илгээн үүссэн нэхэмжлэхийн дагуу худалдан
              авалтаа баталгаажуулснаар бараа бүтээгдэхүүн, үйлчилгээгээ авах
              боломжтой.
            </AlertDescription>
          </Alert>
        )}
        <DialogFooter className="block gap-2 space-y-2 pt-4 sm:justify-center md:flex md:space-y-0">
          <BackButton disabled={loading} />
          <Button size="lg" className="w-full flex-1" disabled={loading}>
            {loading && <LoadingIcon />} Хүсэлт илгээх
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
};

export default PhoneDetail;
