"use client";

import { Fragment, useEffect } from "react";

import { availableTimes } from "../utils";
import { useAddAppointment } from "../api/useAddAppointment";

import { useQuery } from "@apollo/client";
import { queries } from "@/gql/board";
import { queries as stageQL } from "@/gql/stage";
import { queries as productsQL } from "@/gql/product";

import { ServicesFields } from "./services-fields";
import { ServicesCars } from "./services-cars";
import { CarModal } from "@/features/profile/components/car-modal";

import { TCustomer } from "@/types";
import { useService } from "../store/useService";
import { usePipelines } from "../api/usePipelines";

interface ServicesContentProps {
  currentUser: TCustomer | null;
  cars: {
    id: string;
    number: string;
    catId: string;
  }[];
  carCats: any;
  searchParams: {
    catId?: string;
    carId?: string;
  };
}

export const ServicesContent = ({
  currentUser,
  cars,
  carCats,
  searchParams,
}: ServicesContentProps) => {
  const { branch, option, date } = useService();

  const { pipelines } = usePipelines(branch);

  const pipelineId =
    pipelines?.find((p: any) => p?.name?.includes("Үндсэн"))?._id || null;

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

  const { data: dataCheckFreeTimes } = useQuery(queries.availableTimes, {
    variables: {
      pipelineId,
      intervals: availableTimes(date as any),
    },

    fetchPolicy: "no-cache",
    skip: !pipelineId || !date,
  });

  const { data: dataStages, refetch } = useQuery(stageQL.stages, {
    variables: {
      pipelineId: pipelineId || "",
      isAll: true,
    },
    skip: !pipelineId,
  });

  const { onSubmit, isPending } = useAddAppointment({
    dataProducts,
    dataBoards,
    dataStages,
    cars,
    currentUser,
    dataCheckFreeTimes,
  });

  useEffect(() => {
    refetch();
  }, []);

  return (
    <Fragment>
      <div className="grid w-full grid-cols-1 gap-x-3 gap-y-5 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <ServicesCars
          currentUser={currentUser}
          carCats={carCats}
          cars={cars}
          searchParams={searchParams}
        />

        <ServicesFields isPending={isPending} onSubmit={onSubmit} />
      </div>

      <CarModal cats={carCats} userId={currentUser?.erxesCustomerId!} />
    </Fragment>
  );
};
