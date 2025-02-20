import { getClient } from "@/gql/apollo-client";
import { queries as serviceQueries } from "@/gql/deal";
import {
  APPOINTMENT_STAGES,
  GOLDEN_TIME_PIPELINE_ID,
} from "@/features/profile/constant";
import { getCurrentUser } from "@/lib/actions";

export const getUserServiceHistory = async () => {
  const user = await getCurrentUser();

  const { data } = await getClient().query({
    query: serviceQueries.serviceHistory,
    variables: {
      mainType: "customer",
      mainTypeId: user?.erxesCustomerId,
      relType: "deal",
      limit: 40,
      isSaved: true,
      noSkipArchive: false,
    },
  });

  const filtered = data?.deals?.filter(
    (deal: any) => deal?.stage?.pipelineId !== GOLDEN_TIME_PIPELINE_ID,
  );

  const activeAppointment =
    filtered?.filter((deal: any) =>
      APPOINTMENT_STAGES.includes(deal?.stage?._id),
    ) || [];

  const historyAppointment =
    filtered?.filter(
      (deal: any) => !APPOINTMENT_STAGES.includes(deal?.stage?._id),
    ) || [];

  return {
    user,
    activeServices: activeAppointment ? activeAppointment : [],
    historyServices: historyAppointment ? historyAppointment : [],
  };
};
