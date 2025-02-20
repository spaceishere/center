import { mutations } from "@/gql/car";
import { useMutation } from "@apollo/client";
import { revalidateTag } from "next/cache";
import { redirect, usePathname } from "next/navigation";

export const useCar = () => {
  const [carAdd] = useMutation(mutations.carsAdd);
  const [carEdit] = useMutation(mutations.carsEdit);
  const [carDelete] = useMutation(mutations.carsDelete);
  const [onConfirmity] = useMutation(mutations.confirmityEdit);

  const pathname = usePathname();

  const onCarAdd = async (
    plateNumber: string,
    categoryId: string,
    userId: string,
  ) => {
    const { data } = await carAdd({
      variables: {
        ownerId: "",
        plateNumber,
        vinNumber: "",
        colorCode: "",
        categoryId,
        bodyType: "",
        fuelType: "",
        gearBox: "",
        vintageYear: 2024,
        importYear: 2024,
        description: "",
      },
    });

    await onConfirmity({
      variables: {
        mainType: "car",
        mainTypeId: data.carsAdd._id,
        relType: "customer",
        relTypeIds: [userId],
      },
    });

    if (pathname.includes("profile")) {
      window.location.href = `/profile`;
    } else {
      window.location.href = `/services`;
    }
  };

  return {
    onCarAdd,

    carEdit,

    carDelete,
  };
};
