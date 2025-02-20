import { gql, useSuspenseQuery } from "@apollo/client";
import { TFaq } from "../types";

export const useFaqs = () => {
  const { data } = useSuspenseQuery<{ knowledgeBaseArticles: TFaq[] }>(query, {
    variables: {
      page: 1,
      perPage: 20,
      categoryIds: ["UW627tJN9mwNB4R5zcz7Z"],
    },
  });

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
