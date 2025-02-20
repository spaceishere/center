import { redirect } from "next/navigation";

import { getMetadata } from "@/lib/metadata";
import { getCurrentUser } from "@/lib/actions";
import { getUserCarAndCarCats } from "@/features/profile/api/getUserCarsAndCarCats";

import { MyCarsHeader } from "@/features/profile/components/my-cars-header";
import { MyCars } from "@/features/profile/components/my-cars";
import { CarModal } from "@/features/profile/components/car-modal";

export async function generateMetadata() {
  return await getMetadata("Миний машинууд");
}

const Profile = async ({
  searchParams,
}: {
  searchParams: {
    catId?: string;
  };
}) => {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/");
  }

  const { carCats, cars } = await getUserCarAndCarCats(
    user.erxesCustomerId as string,
    searchParams?.catId,
  );

  return (
    <div className="w-full space-y-3 rounded-[16px] border border-gray-200 p-4">
      <MyCarsHeader cats={carCats} />

      <MyCars cars={cars} />

      <CarModal cats={carCats} userId={user.erxesCustomerId || ""} />
    </div>
  );
};

export default Profile;
