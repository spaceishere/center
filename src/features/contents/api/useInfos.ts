import { gql, useSuspenseQuery } from "@apollo/client";
import { TContent } from "../types";

export const useInfos = (limit?: number) => {
  const { data } = useSuspenseQuery<{
    knowledgeBaseCategoryDetail: { articles: TContent[] };
  }>(query, {
    variables: {
      _id: "ysMj-vvrWv76Y11l07pfH",
    },
    queryKey: ["infos", "all", limit],
  });

  return {
    infos: limit
      ? data?.knowledgeBaseCategoryDetail.articles.slice(0, limit)
      : data?.knowledgeBaseCategoryDetail.articles || [],
  };
};

const query = gql`
  query knowledgeBaseCategoryDetail($_id: String!) {
    knowledgeBaseCategoryDetail(_id: $_id) {
      articles {
        _id
        title
        attachments {
          url
        }
        image {
          url
        }
        content
      }
    }
  }
`;
