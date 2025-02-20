"use server";

import { getClient } from "@/gql/apollo-client";
import { getCurrentUser } from "@/lib/actions";
import { TCustomer } from "@/types";
import { gql } from "@apollo/client";

export const getScores = async (): Promise<{
  user: TCustomer | null;
  scores: { changeScore: number; createdAt: Date }[];
}> => {
  try {
    const user = await getCurrentUser();

    const { data } = await getClient().query({
      query,
      variables: {
        page: 1,
        perPage: 300,
        ownerId: user?.erxesCustomerId,
        ownerType: "customer",
      },
    });

    return {
      user,
      scores: data.scoreLogList.list || [],
    };
  } catch (error) {
    return {
      user: null,
      scores: [],
    };
  }
};

const query = gql`
  query scoreLogList($page: Int, $perPage: Int, $ownerId: String) {
    scoreLogList(page: $page, perPage: $perPage, ownerId: $ownerId) {
      list {
        changeScore
        createdAt
      }
      total
    }
  }
`;
