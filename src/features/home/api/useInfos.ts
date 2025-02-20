import { gql, useSuspenseQuery } from "@apollo/client";
import { TInfo } from "../types";

export const useInfos = () => {
  const { data } = useSuspenseQuery<{
    knowledgeBaseCategoryDetail: { articles: TInfo[] };
  }>(query, {
    variables: {
      _id: "ysMj-vvrWv76Y11l07pfH",
    },
    queryKey: ["infos", "home"],
  });

  return {
    infos: data?.knowledgeBaseCategoryDetail.articles || [],
  };
};

const query = gql`
  query knowledgeBaseCategoryDetail($_id: String!) {
    knowledgeBaseCategoryDetail(_id: $_id) {
      articles {
        _id
        title
        content
        image {
          url
        }
      }
    }
  }
`;
