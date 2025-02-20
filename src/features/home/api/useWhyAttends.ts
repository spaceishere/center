import { gql, useSuspenseQuery } from "@apollo/client";
import { TWhyAttend } from "../types";

export const useWhyAttends = () => {
  const { data } = useSuspenseQuery<{ knowledgeBaseArticles: TWhyAttend[] }>(
    query,
    {
      variables: {
        page: 1,
        perPage: 4,
        categoryIds: ["H_dK09xaI6fAMSzG47hIj"],
      },
    },
  );

  return {
    whyAttends: data.knowledgeBaseArticles,
  };
};

const query = gql`
  query knowledgeBaseArticles(
    $page: Int
    $perPage: Int
    $categoryIds: [String]
  ) {
    knowledgeBaseArticles(
      page: $page
      perPage: $perPage
      categoryIds: $categoryIds
    ) {
      _id
      title
      content
      image {
        url
      }
    }
  }
`;
