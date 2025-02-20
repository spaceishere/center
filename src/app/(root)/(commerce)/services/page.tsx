import Image from "next/image";

import { getMetadata } from "@/lib/metadata";
import { getUserCarAndCarCats } from "@/features/profile/api/getUserCarsAndCarCats";
import { getCurrentUser } from "@/lib/actions";

import { Container } from "@/components/container";
import { ServicesContent } from "@/features/services/components/services-content";
import { ServicesForm } from "@/features/services/components/services-form";

export async function generateMetadata() {
  return await getMetadata("Цаг захиалга");
}

const ServicesPage = async ({
  searchParams,
}: {
  searchParams: {
    catId?: string;
    carId?: string;
  };
}) => {
  const user = await getCurrentUser();

  let carCats = [];
  let cars: {
    id: string;
    number: string;
    catId: string;
  }[] = [];

  if (user?.erxesCustomerId) {
    const { carCats: carCats1, cars: cars1 } = await getUserCarAndCarCats(
      user?.erxesCustomerId,
      searchParams.catId,
    );

    cars = cars1;
    carCats = carCats1;
  }

  return (
    <div className="w-full">
      <div className="relative z-[1] h-[222px] w-full">
        <Image
          src={"/assets/home/slider.png"}
          alt="slider 1"
          fill
          className="object-cover object-center"
          draggable={false}
        />
      </div>

      <Container className="-space-y-[40px] pt-14 lg:pt-0">
        <ServicesForm currentUser={user} cars={cars} />

        <ServicesContent
          currentUser={user}
          carCats={carCats}
          cars={cars}
          searchParams={searchParams}
        />
      </Container>
    </div>
  );
};
export default ServicesPage;
