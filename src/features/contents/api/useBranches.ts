import { TBranch } from "@/types";
import { gql, useSuspenseQuery } from "@apollo/client";

export const useBranches = (id: string) => {
  const { data } = useSuspenseQuery<{ branches: TBranch[] }>(query, {
    variables: {
      withoutUserFilter: true,
      ids: [id],
    },
  });

  const foundBranch = data.branches?.find((branch) => branch._id === id);

  let branch: TBranch = {
    _id: foundBranch?._id as string,
    title: foundBranch?.title as string,
    address: foundBranch?.address as string,
    image: foundBranch?.image as any,
    workhours: foundBranch?.workhours as any,
  };

  return {
    branch,
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
        __typename
      }
      workhours
    }
  }
`;
