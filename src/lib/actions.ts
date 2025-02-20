import { getClient } from "@/gql/apollo-client";
import { queries } from "@/gql/auth";

import { TCustomer } from "@/types";

export const getConfig = async () => {
  const { data } = await getClient().query({
    query: queries.currentConfig,
  });
  const { currentConfig } = data || {};

  return { config: currentConfig };
};

export const getCurrentUser = async () => {
  try {
    const { data } = await getClient().query({ query: queries.currentUser });

    return data.clientPortalCurrentUser as TCustomer | null;
  } catch (error) {
    return null;
  }
};
