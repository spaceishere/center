import { Suspense } from "react";

import { Container } from "@/components/container";
import { BrandVideo } from "@/components/videos";
import { Hero, HeroSkeleton } from "@/features/brand/components/hero";
import { Brands, BrandsSkeleton } from "@/features/brand/components/brands";
import { getMetadata } from "@/lib/metadata";

export async function generateMetadata() {
  return await getMetadata("Брэнд");
}

const BrandPage = ({
  searchParams,
}: {
  searchParams: { activeId?: string; pId?: string };
}) => {
  return (
    <>
      <Container className="py-0">
        <Suspense fallback={<HeroSkeleton />}>
          <Hero activeId={searchParams.activeId} pId={searchParams.pId} />
        </Suspense>
      </Container>

      <Container containerClassName="bg-gray-100 pt-11">
        <p className="w-full text-center text-lg font-medium text-muted-foreground">
          Японд үйлдвэрлэгдсэн япон тосыг япон автомашинд.
        </p>
        <p className="pb-6 text-center text-3xl font-bold">Приус брэнд</p>

        <div className="md:mx-[10%] lg:mx-[20%]">
          <BrandVideo />
        </div>
      </Container>

      <Container className="py-20">
        <Suspense fallback={<BrandsSkeleton />}>
          <Brands activeId={searchParams.activeId} />
        </Suspense>
      </Container>
    </>
  );
};

export default BrandPage;
