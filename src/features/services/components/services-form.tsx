"use client";

import { toast } from "sonner";
import { useEffect, useMemo, useState } from "react";
import { addDays, format } from "date-fns";
import { usePathname, useRouter } from "next/navigation";
import { useQuery } from "@apollo/client";
import { useAtom } from "jotai";

import { useAddAppointment } from "../api/useAddAppointment";

import { cn } from "@/lib/utils";
import { isOpenAtom } from "@/features/auth/store/auth";
import { queries } from "@/gql/board";
import { queries as productsQL } from "@/gql/product";
import { queries as stageQL } from "@/gql/stage";
import { useService } from "../store/useService";
import { serviceOptions } from "../constant";
import { availableTimes, TimeTableGenerate } from "../utils";

import { Calendar } from "@/components/ui/calendar";

import { TCustomer } from "@/types";

import {
  AlarmClockPlus,
  CalendarIcon,
  ChevronDown,
  ChevronLeft,
  ChevronUp,
  Headset,
  Loader,
  PhoneCall,
} from "lucide-react";
import { usePipelines } from "../api/usePipelines";

interface ServicesFormProps {
  currentUser: TCustomer | null;
  cars: {
    id: string;
    number: string;
    catId: string;
  }[];
}

export const ServicesForm = ({ currentUser, cars }: ServicesFormProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const {
    setOption,
    setBranch,
    setDate,
    setTime,
    option,
    branch,
    date,
    setBranchTitle,
  } = useService();

  const { pipelines } = usePipelines(branch);

  const pipelineId =
    pipelines?.find((p: any) => p?.name?.includes("Үндсэн"))?._id || null;

  const [isOpen, setIsOpen] = useState<
    "date" | "time" | "branch" | "option" | undefined
  >(undefined);

  const [_, setOpenAuthModal] = useAtom(isOpenAtom);

  const { data: dataProducts } = useQuery(productsQL.products, {
    variables: {
      ids: [option],
    },
    skip: !option,
  });
  const { data: dataBoards } = useQuery(queries.boards, {
    variables: {
      type: "deal",
    },
    skip: !currentUser?.erxesCustomerId,
  });

  const { loading, data: dataCheckFreeTimes } = useQuery(
    queries.availableTimes,
    {
      variables: {
        pipelineId,
        intervals: availableTimes(date as any),
      },

      fetchPolicy: "no-cache",
      skip: !pipelineId || !date,
    },
  );

  const { data: dataStages, refetch: refetchStages } = useQuery(
    stageQL.stages,
    {
      variables: {
        pipelineId: pipelineId || "",
        isAll: true,
      },
      skip: !pipelineId,
    },
  );

  const onSelect = (
    fieldName: "date" | "time" | "option" | "branch",
    value: string | Date,
    title?: string,
  ) => {
    if (fieldName === "branch") {
      if (!option) {
        toast.error("Та эхлээд үйлчилгээний төрөлөө сонгоно уу!");
        return;
      }
    }
    if (fieldName === "date") {
      if (!option || !branch) {
        toast.error("Та эхлээд үйлчилгээ салбарыг сонгоно уу!");
        return;
      }
    }
    if (fieldName === "time") {
      if (!option || !branch || !date) {
        toast.error("Та эхлээд үйлчилгээ, салбар өдөрөө сонгоно уу!");
        return;
      }
    }

    if (fieldName === "branch" && typeof value === "string") {
      setBranch(value);
      setBranchTitle(title);
    }
    if (fieldName === "date") {
      setDate(value as any);
    }
    if (fieldName === "time" && typeof value === "string") {
      setTime(value);
    }
    if (fieldName === "option" && typeof value === "string") {
      setOption(value);
    }
  };

  const { onSubmit, isPending } = useAddAppointment({
    dataProducts,
    dataBoards,
    dataStages,
    cars,
    currentUser,
    dataCheckFreeTimes,
  });

  const hasAvailableTimes = useMemo(() => {
    if (!branch) return false;
    if (!date || !dataCheckFreeTimes?.salesCheckFreeTimes) return false;

    return TimeTableGenerate({
      selectedBoard: branch,
      valueDate: date,
      checkTimes: dataCheckFreeTimes?.checkFreeTimes,
    }).some((time: any) => !time?.status);
  }, [date, dataCheckFreeTimes, branch]);

  const freeTimes = useMemo(() => {
    if (!branch) return [];
    if (!date || !dataCheckFreeTimes?.salesCheckFreeTimes) return [];

    return TimeTableGenerate({
      selectedBoard: branch,
      valueDate: date,
      checkTimes: dataCheckFreeTimes?.salesCheckFreeTimes,
    });
  }, [date, dataCheckFreeTimes, branch]);

  useEffect(() => {
    if (!currentUser && pathname !== "/") {
      setOpenAuthModal(true);
    }

    if (!currentUser) {
      router.push(pathname);
    }
  }, [currentUser, setOpenAuthModal, pathname, router]);

  const selectedOption = serviceOptions.find((item) => item.value === option);
  const selectedBranch = dataBoards?.salesBoards.find(
    (item: any) => item?._id === branch,
  );

  useEffect(() => {
    refetchStages();
  }, []);

  return (
    <div
      className={cn(
        "relative z-[2] flex w-full -translate-y-20 flex-col items-center -space-y-8",
        pathname === "/" && "translate-y-2 sm:-translate-y-20",
      )}
    >
      <div className="relative z-[2] mx-auto hidden w-full max-w-[600px] rounded-full bg-black/70 p-[6px] sm:inline-flex">
        <div className="flex flex-1 items-center justify-center gap-x-3 rounded-full bg-white py-[15px]">
          <AlarmClockPlus className="size-[18px] text-primary" />
          <p className="text-lg font-medium text-primary">Цаг захиалга</p>
        </div>

        <div
          className="flex flex-1 cursor-pointer items-center justify-center gap-x-3 py-[15px]"
          onClick={() =>
            toast.info("Уг үйлчилгээ тун удахгүй нээгдэнэ", {
              style: { color: "white", backgroundColor: "green" },
            })
          }
        >
          <PhoneCall className="size-[18px] text-white" />
          <p className="text-lg font-medium text-white">
            Дуудалгын засвар үйлчилгээ
          </p>
        </div>
      </div>

      <div className="grid w-full gap-x-4 gap-y-5 rounded-lg bg-white px-5 pb-6 pt-[55px] shadow-lg sm:grid-cols-2 md:px-6 lg:px-8 xl:grid-cols-4">
        <div className="relative col-span-1">
          <div
            onClick={() =>
              setIsOpen((prev) => (prev === "option" ? undefined : "option"))
            }
            className="flex w-full cursor-pointer items-center gap-x-4 rounded-[12px] bg-[#F5F5F5] p-4 2xl:p-5"
          >
            <Headset className="size-[18px] text-gray-500" />
            <p
              className={cn(
                "text-[14px] font-medium text-gray-400 xl:text-base",
                selectedOption && "text-gray-600",
              )}
            >
              {selectedOption?.label || "Үйлчилгээ"}
            </p>

            {isOpen === "option" ? (
              <ChevronUp className="ml-auto size-5" />
            ) : (
              <ChevronDown className="ml-auto size-5" />
            )}
          </div>

          {isOpen === "option" && (
            <div className="absolute inset-x-0 top-[calc(100%+10px)] z-[1] flex flex-col gap-y-3 rounded-[12px] border border-gray-200 bg-white p-4">
              {serviceOptions.map((item) => (
                <div
                  className="cursor-pointer rounded-lg bg-gray-100 p-3"
                  key={item.value}
                  onClick={() => {
                    onSelect("option", item.value);
                    setIsOpen(undefined);
                  }}
                >
                  <p className="font-medium text-gray-700">{item.label}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="relative col-span-1">
          <div
            onClick={() => {
              if (!currentUser) {
                toast.info("Та эхлээд нэвтэрч орно уу!", {
                  style: { color: "white", backgroundColor: "green" },
                });
                return;
              }
              if (!dataBoards) return;
              setIsOpen((prev) => (prev === "branch" ? undefined : "branch"));
            }}
            className="flex w-full cursor-pointer items-center gap-x-4 rounded-[12px] bg-[#F5F5F5] p-4 2xl:p-5"
          >
            <Headset className="size-[18px] text-gray-500" />
            <p
              className={cn(
                "text-[14px] font-medium text-gray-400 xl:text-base",
                selectedBranch && "text-gray-600",
              )}
            >
              {selectedBranch?.name || "Caлбар"}
            </p>

            {isOpen === "branch" ? (
              <ChevronUp className="ml-auto size-5" />
            ) : (
              <ChevronDown className="ml-auto size-5" />
            )}
          </div>

          {isOpen === "branch" && dataBoards && (
            <div className="absolute inset-x-0 top-[calc(100%+10px)] z-[1] flex max-h-[400px] flex-col gap-y-3 overflow-y-auto rounded-[12px] border border-gray-200 bg-white p-4">
              {dataBoards?.salesBoards.map(
                (board: { name: string; _id: string; pipelines: any[] }) =>
                  board?.name.includes("салбар") && (
                    <div
                      className="cursor-pointer rounded-lg bg-gray-100 p-3"
                      key={board._id}
                      onClick={() => {
                        console.log({ board });
                        onSelect("branch", board._id, board.name);
                        setIsOpen(undefined);
                      }}
                    >
                      <p className="font-medium text-gray-700">{board.name}</p>
                    </div>
                  ),
              )}
            </div>
          )}
        </div>

        <div className="relative col-span-1">
          <div
            onClick={() =>
              setIsOpen((prev) =>
                prev === "date" || prev === "time"
                  ? undefined
                  : date
                    ? "time"
                    : "date",
              )
            }
            className="flex w-full cursor-pointer items-center gap-x-4 rounded-[12px] bg-[#F5F5F5] p-4 2xl:p-5"
          >
            <CalendarIcon className="size-[18px] text-gray-500" />

            <p
              className={cn(
                "text-[14px] font-medium text-gray-400 xl:text-base",
                date && "text-gray-600",
              )}
            >
              {date ? format(date, "dd.MM.yyyy") : <span>Өдөр сонгох</span>}{" "}
            </p>

            {isOpen === "time" || isOpen === "date" ? (
              <ChevronUp className="ml-auto size-5" />
            ) : (
              <ChevronDown className="ml-auto size-5" />
            )}
          </div>

          {isOpen === "date" && (
            <div className="absolute inset-x-0 top-[calc(100%+10px)] z-[1] flex flex-col items-center justify-center gap-y-3 rounded-[12px] border border-gray-200 bg-white p-4">
              <Calendar
                mode="single"
                selected={date as any}
                onSelect={(date) => {
                  onSelect("date", date as any);
                  setIsOpen("time");
                }}
                initialFocus
                disabled={(date) =>
                  date <= new Date() || date > addDays(new Date(), 7)
                }
              />
            </div>
          )}

          {isOpen === "time" && (
            <div className="absolute inset-x-0 top-[calc(100%+10px)] z-[1] flex max-h-[400px] flex-col gap-y-3 overflow-y-auto rounded-[12px] border border-gray-200 bg-white p-4">
              <div
                className="h-10 pb-3"
                onClick={() => {
                  onSelect("time", "");
                  setIsOpen("date");
                }}
              >
                <ChevronLeft className="text-primary" />
              </div>

              {hasAvailableTimes ? (
                freeTimes?.map((time, index) => (
                  <div
                    className="cursor-pointer rounded-lg bg-gray-100 p-3"
                    key={index}
                    onClick={() => {
                      onSelect("time", JSON.stringify(time));
                      setIsOpen(undefined);
                    }}
                  >
                    <p className="font-medium text-gray-700">
                      {time.start + "-" + time.end}
                    </p>
                  </div>
                ))
              ) : loading ? (
                <Loader className="mx-auto animate-spin" />
              ) : (
                "Энэ салбар дээр цаг захиалах боломжгүй байна"
              )}
            </div>
          )}
        </div>

        <button
          className="flex w-full cursor-pointer items-center justify-center gap-x-4 rounded-[12px] bg-primary p-4 2xl:p-5"
          disabled={isPending || loading}
          onClick={onSubmit}
          type="button"
        >
          <p className="font-medium text-white">Цаг захиалах</p>
        </button>
      </div>
    </div>
  );
};
