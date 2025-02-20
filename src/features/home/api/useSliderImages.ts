import { gql, useSuspenseQuery } from "@apollo/client";
import { TSliderImage } from "../types";

export const useSliderImages = () => {
  const { data } = useSuspenseQuery<{ knowledgeBaseArticles: TSliderImage[] }>(
    query,
    {
      variables: {
        categoryIds: ["xXtbm2LtFa4gGlq0zkzIw"],
      },
    },
  );

  return {
    images: data.knowledgeBaseArticles.map((item) => item.image?.url) as (
      | string
      | null
      | undefined
    )[],
  };
};

const query = gql`
  query objects($page: Int, $perPage: Int, $categoryIds: [String]) {
    knowledgeBaseArticles(
      page: $page
      perPage: $perPage
      categoryIds: $categoryIds
    ) {
      _id
      image {
        url
      }
    }
  }
`;
