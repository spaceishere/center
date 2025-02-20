import { gql, useSuspenseQuery } from "@apollo/client";
import { TCategory } from "../types";

export const useCategories = () => {
  const { data } = useSuspenseQuery<{
    poscProductCategories: {
      _id: string;
      name: string;
      parentId: string | null;
    }[];
  }>(query, { queryKey: ["primart-categories"] });

  let fixedCategories: (TCategory & {
    categories: (TCategory & {
      subCategories: TCategory[];
    })[];
  })[] = [];

  data.poscProductCategories.map((category) => {
    if (category.parentId === "mdJADEoreKvsY7eeX") {
      fixedCategories.push({ ...category, categories: [] });

      return;
    }

    if (category.parentId !== "") {
      const firstChild = fixedCategories.findIndex(
        (cat) => cat._id === category.parentId,
      );

      if (firstChild !== -1) {
        fixedCategories[firstChild].categories = [
          ...fixedCategories[firstChild].categories,
          { ...category, subCategories: [] },
        ];
      } else {
        let parantIndex = -1;
        let childIndex = -1;
        fixedCategories.map((cat, pIndex) => {
          cat.categories.map((c, cIndex) => {
            if (c._id === category.parentId) {
              parantIndex = pIndex;
              childIndex = cIndex;
            }
          });
        });

        if (parantIndex !== -1 && childIndex !== -1) {
          fixedCategories[parantIndex].categories[childIndex].subCategories = [
            ...fixedCategories[parantIndex].categories[childIndex]
              .subCategories,
            {
              ...category,
            },
          ];
        }
      }
    }
  });

  return fixedCategories;
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
      parentId
    }
  }
`;
