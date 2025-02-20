import { gql } from "@apollo/client";

const branches = gql`
  query branches(
    $ids: [String]
    $excludeIds: Boolean
    $perPage: Int
    $page: Int
    $searchValue: String
    $status: String
    $withoutUserFilter: Boolean
  ) {
    branches(
      ids: $ids
      excludeIds: $excludeIds
      perPage: $perPage
      page: $page
      searchValue: $searchValue
      status: $status
      withoutUserFilter: $withoutUserFilter
    ) {
      _id
      title
      address
      image {
        url
        name
        type
        size
        __typename
      }
    }
  }
`;

export default branches;
