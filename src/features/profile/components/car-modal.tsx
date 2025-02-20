"use client";

import Image from "next/image";
import { useCarModal } from "@/features/profile/store/useCarModal";
import { useEffect, useState, useTransition } from "react";
import { toast } from "sonner";

import { useCar } from "@/features/profile/api/useCar";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import {
  SelectContent,
  SelectItem,
  Select,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";

import { Edit, Plus } from "lucide-react";
import { uploadedCarImagesCode } from "../constant";
import { revalidatePath } from "next/cache";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

interface CarModalProps {
  cats: any[];
  userId: string;
}

export const CarModal = ({ cats, userId }: CarModalProps) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const { isOpen, action, onClose, carData } = useCarModal();
  const [number, setNumber] = useState(carData?.number.slice(3) || "");
  const [catId, setCatId] = useState(
    carData ? carData.catId : (cats?.[0]?._id as string) || "",
  );

  const { onCarAdd, carEdit } = useCar();

  const [hyd, setHyd] = useState(false);

  useEffect(() => {
    setHyd(true);
  }, []);

  useEffect(() => {
    if (carData) {
      setNumber(carData.number || "");
    }
  }, [carData]);

  if (!hyd) return;

  const onClick = () => {
    startTransition(async () => {
      if (number.length !== 7 && action === "create") {
        toast.error("Машины дугаарыг бүтэн бөглөнө үү.");
        return;
      }

      if (!carData?.id && number.length !== 7 && action === "edit") {
        toast.error("Машины дугаарыг бүтэн бөглөнө үү.");
        return;
      }

      if (action === "create") {
        await onCarAdd(number, catId, userId);
      } else if (action === "edit" && carData) {
        await carEdit({
          variables: {
            _id: carData.id,
            plateNumber: number,
            categoryId: catId,
          },
        });
      }

      router.refresh();
      onClose();
    });
  };

  const splitStr = carData?.category?.code?.split(" ") || [];
  const validCode = splitStr?.length > 1 ? splitStr[1] : "";

  const isValidCode = uploadedCarImagesCode?.includes(validCode);

  const carColorCode = carData?.colorCode;

  const url = isValidCode
    ? {
        uri:
          "https://erxes.priuscenter.mn/gateway" +
          "/read-file?key=priuscenter/&width=600" +
          validCode +
          "_" +
          carColorCode?.replace("#", "") +
          ".png",
      }
    : {
        uri: "https://erxes.priuscenter.mn/gateway/read-file?key=priuscenter/pr30_ffffff.png&width=600",
      };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-full">
        <div className="flex w-full items-center justify-between">
          <div>Машины мэдээлэл</div>

          <div
            className="relative z-[2] flex h-10 w-max cursor-pointer items-center justify-center rounded-lg border px-3 text-green-600 transition-colors duration-200 hover:bg-gray-100"
            onClick={onClick}
          >
            {action === "create" ? "Нэмэх" : "Засах"}
          </div>
        </div>

        <div className="relative z-[1] aspect-[16/6] w-full overflow-hidden">
          <Image
            src={url.uri ?? "/assets/profile/car.svg"}
            alt="car"
            className="scale-[1.8] object-contain object-center"
            fill
            draggable={false}
          />
        </div>
        <div className="relative z-[2] space-y-2">
          <p className="text-[18px] font-medium">Машины дугаар</p>

          <div className="flex h-10 w-full flex-col gap-x-4 gap-y-3 sm:flex-row">
            <InputOTP
              value={number}
              onChange={(e) => setNumber(e)}
              maxLength={7}
              pattern={`^[a-zA-Z\u0400-\u04FF0-9]+$`}
            >
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
              </InputOTPGroup>
              <InputOTPSeparator />
              <InputOTPGroup>
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
                <InputOTPSlot index={6} />
              </InputOTPGroup>
            </InputOTP>

            <Select
              value={catId}
              disabled={isPending}
              onValueChange={(item) => setCatId(item)}
            >
              <SelectTrigger
                defaultValue={catId}
                value={catId}
                className="h-full w-full max-w-[140px] sm:w-auto sm:flex-1"
              >
                <SelectValue placeholder="Select Car mark" />
              </SelectTrigger>
              <SelectContent>
                {cats.map((cat) => (
                  <SelectItem value={cat._id} key={cat._id}>
                    {cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
