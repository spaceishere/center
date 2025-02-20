import { gql, useQuery } from "@apollo/client";

export const usePipelines = (boardId?: string) => {
  const { data } = useQuery<{
    salesPipelines: { _id: string; name: string }[];
  }>(query, {
    variables: {
      boardId,
      perPage: 100,
      isAll: true,
      page: 1,
    },
    skip: !boardId,
  });

  return {
    pipelines: data?.salesPipelines || [],
  };
};

const query = gql`
  query salesPipelines(
    $boardId: String
    $type: String
    $perPage: Int
    $page: Int
  ) {
    salesPipelines(
      boardId: $boardId
      type: $type
      perPage: $perPage
      page: $page
    ) {
      _id
      name
    }
  }
`;
