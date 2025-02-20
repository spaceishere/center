import { gql, useSuspenseQuery } from "@apollo/client";
import { TContent } from "../types";

export const useContents = (catId: string, limit?: number) => {
  const { data } = useSuspenseQuery<{ knowledgeBaseArticles: TContent[] }>(
    query,
    {
      variables: {
        page: 1,
        perPage: limit ?? 5,
        categoryIds: [catId],
      },
      queryKey: ["contents", catId, limit ?? 5],
    },
  );

  return {
    contents: data.knowledgeBaseArticles || [],
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
      attachments {
        url
      }
      image {
        url
      }
      content
    }
  }
`;
