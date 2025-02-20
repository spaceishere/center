"use server";

import { getClient } from "@/gql/apollo-client";
import { gql } from "@apollo/client";

export const getFirstCatId = async (): Promise<string> => {
  const { data } = await getClient().query({
    query,
  });

  return data?.poscProductCategories?.[0]._id;
};

const query = gql`
  query poscProductCategories {
    poscProductCategories {
      _id
    }
  }
`;
