import { gql, useSuspenseQuery } from "@apollo/client";
import { TImage } from "../types";

export const useImage = () => {
  const { data } = useSuspenseQuery<{ knowledgeBaseArticles: TImage[] }>(
    query,
    {
      variables: {
        page: 1,
        perPage: 20,
        categoryIds: ["lCRRKnULnVmnJpyx0vUZN"],
      },
    },
  );

  return {
    faqs: data.knowledgeBaseArticles || [],
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
