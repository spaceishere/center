import { gql, useSuspenseQuery } from "@apollo/client";
import { TAdvice } from "../types";

export const useAdvices = () => {
  const { data } = useSuspenseQuery<{ knowledgeBaseArticles: TAdvice[] }>(
    query,
    {
      variables: {
        page: 1,
        perPage: 5,
        categoryIds: ["G4XLRhzClxZovqMVXYb9H"],
      },
      queryKey: ["advices", "home"],
    },
  );

  return {
    advices: data.knowledgeBaseArticles || [],
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
      code
      image {
        url
      }
    }
  }
`;
