"use server";

import { getClient } from "@/gql/apollo-client";
import { gql } from "@apollo/client";

export const getBrandCategories = async () => {
  const { data } = await getClient().query({
    query: query,
    variables: { meta: "brand" },
  });

  return {
    categories: data.poscProductCategories,
  };
};

const query = gql`
  query poscProductCategories(
    $parentId: String
    $searchValue: String
    $excludeEmpty: Boolean
    $meta: String
    $page: Int
    $perPage: Int
    $sortField: String
    $sortDirection: Int
  ) {
    poscProductCategories(
      parentId: $parentId
      searchValue: $searchValue
      excludeEmpty: $excludeEmpty
      meta: $meta
      page: $page
      perPage: $perPage
      sortField: $sortField
      sortDirection: $sortDirection
    ) {
      _id
      name
      attachment {
        name
        url
        type
        size
        __typename
      }
      description
    }
  }
`;
