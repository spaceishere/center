"use server";

import { getClient } from "@/gql/apollo-client";
import { gql } from "@apollo/client";
import { TProduct } from "../types";

export const getProducts = async (
  variables: any,
): Promise<{ count: number; products: TProduct[] }> => {
  const { perPage, page, sortField, sortDirection, ...countVariables } =
    variables || {};

  const { data } = await getClient().query({
    query,
    variables: variables,
  });

  const { data: countData } = await getClient().query({
    query: countQuery,
    variables: countVariables,
  });

  return {
    products: data.poscProducts,
    count: countData?.poscProductsTotalCount || 0,
  };
};

const query = gql`
  query poscProdffucts(
    $categoryId: String
    $tag: String
    $page: Int
    $perPage: Int
    $searchValue: String
    $sortDirection: Int
    $sortField: String
    $ids: [String]
  ) {
    poscProducts(
      categoryId: $categoryId
      tag: $tag
      page: $page
      perPage: $perPage
      searchValue: $searchValue
      sortDirection: $sortDirection
      sortField: $sortField
      ids: $ids
    ) {
      _id
      name
      unitPrice
      remainder
      tagIds
      attachment {
        url
      }
      code
    }
  }
`;

const countQuery = gql`
  query productsCount(
    $categoryId: String
    $type: String
    $searchValue: String
    $groupedSimilarity: String
    $isKiosk: Boolean
    $tag: String
  ) {
    poscProductsTotalCount(
      categoryId: $categoryId
      type: $type
      searchValue: $searchValue
      groupedSimilarity: $groupedSimilarity
      isKiosk: $isKiosk
      tag: $tag
    )
  }
`;
