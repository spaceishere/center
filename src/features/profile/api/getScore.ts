"use server";

import { getClient } from "@/gql/apollo-client";
import { getCurrentUser } from "@/lib/actions";
import { gql } from "@apollo/client";

export const getScore = async () => {
  try {
    const user = await getCurrentUser();

    const { data } = await getClient().query({
      query,
      variables: {
        ownerId: user?.erxesCustomerId,
        ownerType: "customer",
        campaignId: "f8R79D_Cd8NCU-5TE7Iz3",
      },
    });

    return {
      user,
      score: (data.checkOwnerScore ?? 0) as number,
    };
  } catch (error) {
    return {
      user: null,
      score: 0,
    };
  }
};

// const query = gql`
//   query customersMain($page: Int, $perPage: Int, $ids: [String]) {
//     customersMain(page: $page, perPage: $perPage, ids: $ids) {
//       list {
//         score
//       }
//     }
//   }
// `;

const query = gql`
  query checkOwnerScore(
    $ownerId: String
    $ownerType: String
    $campaignId: String
  ) {
    checkOwnerScore(
      ownerId: $ownerId
      ownerType: $ownerType
      campaignId: $campaignId
    )
  }
`;
