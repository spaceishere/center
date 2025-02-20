"use client";

import { mutations } from "@/gql/deal";
import { useMutation } from "@apollo/client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useService } from "../store/useService";
import { toast } from "sonner";
import { useTransition } from "react";
import { serviceOptions } from "../constant";
import dayjs from "dayjs";

export const useAddAppointment = ({
  dataProducts,
  dataBoards,
  dataStages,
  cars,
  currentUser,
  dataCheckFreeTimes,
}: {
  dataProducts: any;
  dataBoards: any;
  dataStages: any;
  cars: {
    id: string;
    number: string;
    catId: string;
  }[];
  currentUser: any;
  dataCheckFreeTimes: any;
}) => {
  const [isPending, startTransition] = useTransition();

  const sParams = useSearchParams();
  const pathname = usePathname();
  const { date, branch, option, time, clear } = useService();
  const router = useRouter();

  const [dealsAddMutation] = useMutation(mutations.dealsAdd);
  const [onConformity] = useMutation(mutations.conformityEdit);

  const onSubmit = () => {
    const carId = sParams.get("carId") as string | undefined;

    if (pathname === "/") {
      router.push("/services");
      return;
    }

    if (option === "" || option === undefined) {
      toast.error("Та эхлээд үйлчилгээ сонгоно уу!");
      return;
    }
    if (!branch) {
      toast.error("Та эхлээд салбар сонгоно уу!");
      return;
    }
    if (!date) {
      toast.error("Та эхлээд салбар өдөрөө сонгоно уу!");
      return;
    }
    if (!time) {
      toast.error("Та эхлээд цагаа сонгоно уу!");
      return;
    }
    if (!carId) {
      toast.error("Та эхлээд эхлээд машин аа сонгоно уу!");
      return;
    }
    if (
      !cars?.find((car) => car.id === carId) ||
      !dataBoards?.salesBoards?.find((board: any) => board?._id === branch) ||
      !serviceOptions.find((item) => item.value === option)
    ) {
      router.push("/services");
    }

    startTransition(async () => {
      try {
        const selectedTime = JSON.parse(time);

        const name =
          "Mobile " +
          cars.find((car) => car.id === carId)?.number +
          " " +
          dayjs(date).format("MM/DD") +
          " " +
          (selectedTime?.start || "00:00");

        const product = dataProducts?.products?.[0] ?? {};

        //StartTime
        const startTimeParts = selectedTime.start.split(":");
        const sHour = Number(startTimeParts[0]);
        const sMinute = Number(startTimeParts[1]);
        //EndTime
        const endTimeParts = selectedTime.end.split(":");
        const eHour = Number(endTimeParts[0]);
        const eMinute = Number(endTimeParts[1]);
        const startDate = dayjs(date)
          .hour(sHour)
          .minute(sMinute)
          .second(0)
          .format("YYYY-MM-DDTHH:mm:ss");
        const closeDate = dayjs(date)
          .hour(eHour)
          .minute(eMinute)
          .second(0)
          .format("YYYY-MM-DDTHH:mm:ss");

        const firstStage = dataStages?.salesStages?.[0] ?? {};

        console.log(dataStages);

        const fixedStartDate = dayjs(startDate).subtract(0, "hours");
        const fixedCloseDate = dayjs(closeDate).subtract(0, "hours");

        const tagIds = [
          dataCheckFreeTimes?.salesCheckFreeTimes
            ?.filter(
              (tm: any) =>
                new Date(tm?.startTime).getTime() ===
                fixedStartDate.toDate().getTime(),
            )
            ?.map((time: any) => time?.freeTags?.at(-1)?._id)
            ?.at(0),
        ];

        if (!firstStage?._id) {
          toast.error("Алдаа гарлаа та түр хүлээгээд дахин оролдоно уу.");
          return;
        }

        const { data } = await dealsAddMutation({
          variables: {
            name,
            startDate: fixedStartDate,
            closeDate: fixedCloseDate,
            tagIds: tagIds?.includes(undefined) ? [] : tagIds,
            customerIds: currentUser?.erxesCustomerId || [],
            stageId: firstStage?._id,
            productsData: [
              {
                amount: product?.unitPrice,
                discount: 0,
                discountPercent: 0,
                productId: product?._id,
                quantity: 1,
                maxQuantity: 0,
                tax: 0,
                taxPercent: 0,
                tickUsed: true,
                unitPrice: product?.unitPrice,
                uom: "PC",
                currency: "MNT",
                product: product,
                assignedUsers: undefined,
              },
            ],
          },
        });

        const mainTypeId = data?.dealsAdd?.id;
        await onConformity({
          variables: {
            mainType: "deal",
            mainTypeId: mainTypeId,
            relType: "car",
            relTypeIds: [carId],
          },
        });

        toast.success("Таны цаг захиалга үүслээ.");
        clear();
        router.push("/service-history");
      } catch (error) {
        toast.error("Something went wrong");
      }
    });
  };

  return { onSubmit, isPending };
};
