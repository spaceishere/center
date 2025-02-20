import { gql, useSuspenseQuery } from "@apollo/client";
import { TContent } from "../types";

export const useContentDetail = (id: string) => {
  const { data } = useSuspenseQuery<{ knowledgeBaseArticleDetail: TContent }>(
    query,
    {
      variables: {
        id,
      },
      queryKey: ["content", id],
    },
  );

  return {
    data: data.knowledgeBaseArticleDetail,
  };
};

const query = gql`
  query knowledgeBaseArticleDetail($id: String!) {
    knowledgeBaseArticleDetail(_id: $id) {
      _id
      title
      content
      attachments {
        url
      }
      createdDate
      createdUser {
        username
      }
    }
  }
`;
