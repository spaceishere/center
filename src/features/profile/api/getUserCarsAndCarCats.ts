"use server";

import { getClient } from "@/gql/apollo-client";
import { gql } from "@apollo/client";
import { redirect } from "next/navigation";

export const getUserCarAndCarCats = async (
  customerId?: string,
  catId?: string,
) => {
  try {
    const { data } = await getClient().query({
      query,
      variables: {
        mainType: "customer",
        mainTypeId: customerId,
        perPage: 100,
        page: 1,
        relType: "car",
        isSaved: true,
        categoryId: catId ? catId : undefined,
      },
    });

    const cars = data.cars.map((car: any) => ({
      id: car._id,
      number: car.plateNumber,
      catId: car.categoryId,
      category: car.category,
      colorCode: car.colorCode,
    })) as {
      id: string;
      number: string;
      catId: string;
      category: { code?: string };
      colorCode?: string;
    }[];

    const { data: carCats } = await getClient().query({
      query: catQuery,
    });

    return { cars, carCats: carCats.carCategories };
  } catch (error) {
    redirect("/");
  }
};

const query = gql`
  query cars(
    $page: Int
    $perPage: Int
    $tag: String
    $segment: String
    $categoryId: String
    $ids: [String]
    $searchValue: String
    $brand: String
    $sortField: String
    $sortDirection: Int
    $mainType: String
    $mainTypeId: String
    $relType: String
    $isRelated: Boolean
    $isSaved: Boolean
  ) {
    cars(
      page: $page
      perPage: $perPage
      tag: $tag
      segment: $segment
      categoryId: $categoryId
      ids: $ids
      searchValue: $searchValue
      brand: $brand
      sortField: $sortField
      sortDirection: $sortDirection
      conformityMainType: $mainType
      conformityMainTypeId: $mainTypeId
      conformityRelType: $relType
      conformityIsRelated: $isRelated
      conformityIsSaved: $isSaved
    ) {
      _id
      createdAt
      modifiedAt
      ownerId
      owner {
        _id
        details {
          fullName
          __typename
        }
        email
        __typename
      }
      plateNumber
      vinNumber
      categoryId
      category {
        name
        image {
          url
        }
        code
      }
      colorCode
    }
  }
`;

const catQuery = gql`
  query carCategories {
    carCategories {
      _id
      name
      order
      code
      parentId
      description
      isRoot
      productCategoryId
      image {
        url
        name
        size
        type
        __typename
      }
      secondaryImages {
        url
        name
        size
        type
        __typename
      }
      carCount
      __typename
    }
  }
`;
