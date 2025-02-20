import { z } from "zod";
import type { UseFormReturn } from "react-hook-form";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Toggle } from "@/components/ui/toggle";
import { formSchema } from "./address-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { data } from "../../constant";
import { useState } from "react";

const AddressInfo = ({
  form,
}: {
  form: UseFormReturn<z.infer<typeof formSchema>, any, undefined>;
}) => {
  const [city, setCity] = useState<string | undefined>();
  const [district, setDistrict] = useState<string | undefined>();

  return (
    <div className="space-y-3">
      <h2 className="col-span-6 text-lg font-bold">Хүргэлтийн хаяг</h2>
      <FormField
        control={form.control}
        name="city"
        render={({ field }) => (
          <FormItem className="col-span-2">
            <FormLabel>Хот</FormLabel>
            <Select
              onValueChange={(e) => {
                field.onChange(e.split("_")[0]);
                setCity(e.split("_")[1]);
              }}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Хот/Аймаг сонгоно уу" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {data.city.map((city) => (
                  <SelectItem key={city.id} value={`${city.name}_${city.id}`}>
                    {city.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="district"
        render={({ field }) => (
          <FormItem className="col-span-2">
            <FormLabel>Дүүрэг</FormLabel>

            <Select
              onValueChange={(e) => {
                field.onChange(e.split("_")[0]);
                setDistrict(e.split("_")[1]);
              }}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Дүүрэг сонгоно уу" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {data.district
                  .filter((district) => district.city_id === city)
                  .map((district) => (
                    <SelectItem
                      key={district.id}
                      value={`${district.name}_${district.id}`}
                    >
                      {district.name}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>

            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="street"
        render={({ field }) => (
          <FormItem className="col-span-2">
            <FormLabel>Хороо</FormLabel>
            <Select onValueChange={(e) => field.onChange(e.split("_")[0])}>
              <SelectTrigger>
                <SelectValue placeholder="Хороо/Баг сонгоно уу" />
              </SelectTrigger>
              <SelectContent>
                {data.khoroo
                  .filter((khoroo) => khoroo.district_id === district)
                  .map((street) => (
                    <SelectItem
                      key={street.id}
                      value={`${street.name}_${street.id}`}
                    >
                      {street.name}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>

            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="detail"
        render={({ field }) => (
          <FormItem className="col-span-6">
            <FormLabel>Дэлгэрэнгүй хаяг</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Та хаягаа зөв дэлгэрэнгүй, тодорхой оруулаагүйгээс үүдэн хүргэлт удаашрах, эсвэл хүргэгдэхгүй байж болзошгүйг анхаарна уу"
                {...field}
                autoComplete="address-level4"
                className="min-h-20"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <div />
      <Separator className="col-span-6" />
      <h2 className="col-span-6 text-lg font-bold">Нэмэлт Анхааруулга</h2>
      <FormField
        control={form.control}
        name="haveBaby"
        render={({ field }) => (
          <FormItem className="col-span-3">
            <FormControl>
              <Toggle
                variant="outline"
                size={"lg"}
                className="w-full text-sm"
                pressed={field.value}
                onPressedChange={(pressed) => field.onChange(pressed)}
              >
                Нялх хүүхэдтэй
              </Toggle>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="callBefore"
        render={({ field }) => (
          <FormItem className="col-span-3">
            <FormControl>
              <Toggle
                variant="outline"
                size={"lg"}
                className="w-full text-sm"
                pressed={field.value}
                onPressedChange={(pressed) => field.onChange(pressed)}
              >
                Хүргэхийн өмнө заавал залгах
              </Toggle>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="onlyAfternoon"
        render={({ field }) => (
          <FormItem className="col-span-3">
            <FormControl>
              <Toggle
                variant="outline"
                size={"lg"}
                className="w-full text-sm"
                pressed={field.value}
                onPressedChange={(pressed) => field.onChange(pressed)}
              >
                Зөвхөн оройн цагаар хүргэх
              </Toggle>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default AddressInfo;
