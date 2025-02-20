import { TBranch } from "@/types";
import { gql, useSuspenseQuery } from "@apollo/client";

export const useBranches = () => {
  const { data } = useSuspenseQuery<{
    branches: {
      _id: string;
      title: string;
      address: string;
      image: any;
      code: string;
      coordinate: { latitude: number; longitude: number };
      radius: number;
    }[];
  }>(query, {
    variables: {
      withoutUserFilter: true,
    },
  });

  return {
    branches: data?.branches,
  };
};

const query = gql`
  query branches(
    $ids: [String]
    $excludeIds: Boolean
    $perPage: Int
    $page: Int
    $searchValue: String
    $status: String
    $withoutUserFilter: Boolean
  ) {
    branches(
      ids: $ids
      excludeIds: $excludeIds
      perPage: $perPage
      page: $page
      searchValue: $searchValue
      status: $status
      withoutUserFilter: $withoutUserFilter
    ) {
      _id
      title
      address
      image {
        url
        name
        type
        size
      }
      code
      coordinate {
        latitude
        longitude
      }
      radius
    }
  }
`;
