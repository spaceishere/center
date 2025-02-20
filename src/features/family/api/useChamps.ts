import { gql, useSuspenseQuery } from "@apollo/client";
import { TChamp } from "../types";

export const useChamps = () => {
  const { data } = useSuspenseQuery<{ knowledgeBaseArticles: TChamp[] }>(
    query,
    {
      variables: {
        page: 1,
        perPage: 100,
        categoryIds: ["qVlPtZg9Rd0vRUDLy9xBf"],
      },
    },
  );

  return {
    champs: data.knowledgeBaseArticles.map((item) => ({
      id: item._id,
      name: item.title,
      pro: item.summary || "ok",
      content: item.content,
      avatar: item.image?.url || undefined,
    })),
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
      summary
      content
      image {
        url
      }
    }
  }
`;
