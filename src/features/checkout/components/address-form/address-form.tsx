"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useAtom, useAtomValue } from "jotai";
import { useState, useEffect } from "react";
import { currentUserAtom } from "@/features/auth/store/auth";
import { withDeliveryAtom } from "@/features/checkout/store/branch";
import {
  billTypeAtom,
  deliveryInfoAtom,
  registerNumberAtom,
  branchInfoAtom,
} from "@/features/order/store/order";
import { changeDeliveryInfoAtom } from "@/features/order/store/order";

import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { LoadingIcon } from "@/components/ui/loading";
import { phoneZod } from "@/features/auth/schema";
import PersonalInfo from "./personal-info";
import Ebarimt from "./ebarimt";
import AddressInfo from "./address-info";
import OrderSummary from "../order-summary/order-summary";
import { Separator } from "@/components/ui/separator";
import BranchInfo from "../branch-info";
import { data } from "../../constant";
import { toast } from "sonner";
export const formSchema = z
  .object({
    firstName: z.string().min(1, { message: "First name is required" }),
    lastName: z.string(),
    email: z.string().email().min(1, { message: "Email is required" }),
    phone: phoneZod,
    city: z.string(),
    district: z.string(),
    street: z.string(),
    detail: z.string(),
    haveBaby: z.boolean(),
    callBefore: z.boolean(),
    onlyAfternoon: z.boolean(),
    billType: z.enum(["1", "3", "9"], {
      required_error: "You need to select a notification type.",
    }),
    registerNumber: z.string().optional(),
    companyName: z.string().optional(),
  })
  .refine((data) => (data.billType === "3" ? !!data.registerNumber : true), {
    message: "Register number is required",
    path: ["registerNumber"], // path of error
  })
  .refine(
    (data) =>
      data.billType === "3" && data.registerNumber ? !!data.companyName : true,
    {
      message: "Register number is incorrect",
      path: ["companyName"], // path of error
    },
  );

const AddressForm = () => {
  const {
    firstName = "",
    lastName = "",
    email = "",
    phone = "",
  } = useAtomValue(currentUserAtom) || {};
  const deliveryInfo = useAtomValue(deliveryInfoAtom);
  const billType = useAtomValue(billTypeAtom);
  const registerNumber = useAtomValue(registerNumberAtom);
  const [loading, changeDeliveryInfo] = useAtom(changeDeliveryInfoAtom);
  const router = useRouter();
  const branch = useAtomValue(branchInfoAtom);

  const [isDelivery, setIsDelivery] = useState(false);
  const withDelivery = useAtomValue(withDeliveryAtom);

  useEffect(() => {
    setIsDelivery(withDelivery > 0);
  }, [withDelivery]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    values: {
      firstName,
      lastName,
      email,
      phone,
      city: data.city.find((city) => city.name === "Улаанбаатар")?.id!,
      district: "",
      street: "",
      detail: "",
      haveBaby: false,
      callBefore: false,
      onlyAfternoon: false,
      billType: billType || "1",
      registerNumber: registerNumber || "",
      ...deliveryInfo,
    },
  });

  function onSubmit(v: z.infer<typeof formSchema>) {
    if (!isDelivery && !branch) {
      toast.info("Очиж авах салбараа сонгоно уу");
      return;
    }
    if (isDelivery) {
      const city = form.getValues("city");
      const district = form.getValues("district");
      if (!city) {
        form.setError("city", { message: "Хотоо сонгоно уу" });
        return;
      }
      if (!district) {
        form.setError("district", { message: "Хотоо сонгоно уу" });
        return;
      }
    }

    changeDeliveryInfo({
      ...v,
      branchId: isDelivery ? null : branch?.id || null,
    });
    router.push("/verify");
  }

  return (
    <Form {...form}>
      <form
        className="md:grid md:grid-cols-12 md:gap-x-6"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="col-span-7">
          <div className="mb-10 grid-cols-6 gap-x-4 gap-y-3 space-y-4 md:mb-0 md:grid md:space-y-0">
            <PersonalInfo form={form} />
            <Ebarimt form={form} />
            <div className="col-span-6 flex justify-center gap-4 p-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsDelivery(true)}
                className={`flex-1 hover:bg-gray-200 ${isDelivery ? "bg-gray-200" : ""}`}
              >
                Хүргэлт
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsDelivery(false)}
                className={`flex-1 hover:bg-gray-200 ${!isDelivery ? "bg-gray-200" : ""} `}
              >
                Очиж авах
              </Button>
            </div>
            <Separator className="col-span-6" />
          </div>
          {isDelivery ? (
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <AddressInfo form={form} />
            </form>
          ) : (
            <BranchInfo />
          )}
        </div>

        <OrderSummary className="col-span-5 h-fit md:sticky md:top-40">
          <Button className="w-full" size="lg" type="submit" disabled={loading}>
            {loading && <LoadingIcon />}
            Үргэлжлүүлэх
          </Button>
        </OrderSummary>
      </form>
    </Form>
  );
};

export default AddressForm;
