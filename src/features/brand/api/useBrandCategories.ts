"use client";

import { gql, useSuspenseQuery } from "@apollo/client";

export const useBrandCategories = () => {
  const { data } = useSuspenseQuery<{ poscProductCategories: any[] }>(query, {
    variables: { meta: "brand" },
  });

  data.poscProductCategories.map((item) => {
    console.log(item.meta);
  });

  return {
    categories: data.poscProductCategories.map((item) => ({
      _id: item._id as string,
      name: item.name as string,
      imageSrc: item.attachment?.url,
      description: item.description,
    })),
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
