"use server";

import { getClient } from "@/gql/apollo-client";
import { gql } from "@apollo/client";

import { IAttachment } from "@/types";

export const getBanners = async (): Promise<string[]> => {
  const { data } = await getClient().query({
    query,
    variables: {
      page: 1,
      perPage: 5,
      categoryIds: ["pQQw_KPt8yzP86mTc0jnb"],
    },
  });

  let banners: string[] = [];
  data.knowledgeBaseArticles.map((article: { image: IAttachment }) => {
    banners.push(article.image?.url!);
  });

  return banners;
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
      image {
        url
      }
    }
  }
`;
