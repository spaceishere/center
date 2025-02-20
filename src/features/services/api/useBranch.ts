import { TBranch } from "@/types";
import { gql, useSuspenseQuery } from "@apollo/client";
import { useMemo } from "react";
import { useService } from "../store/useService";

export const useBranch = () => {
  const { branchTitle } = useService();

  const { data } = useSuspenseQuery<{ branches: TBranch[] }>(query, {
    variables: {
      withoutUserFilter: true,
    },
  });

  const selectedBranch = useMemo(() => {
    if (!branchTitle) return undefined;
    const branch = data?.branches.find((item) =>
      item.title
        .toLowerCase()
        .includes(branchTitle.toLowerCase().replace("салбар", "").trim()),
    );
    return branch;
  }, [data, branchTitle]);

  return {
    branch: selectedBranch,
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
