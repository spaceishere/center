import { TOpenJob } from "../types";
import { gql, useSuspenseQuery } from "@apollo/client";

export const useOpenJobs = () => {
  const { data } = useSuspenseQuery<any>(query, {
    variables: {
      page: 1,
      perPage: 100,
      categoryIds: ["hXbfZ4G57no_-5bEO06i3"],
    },
  });

  return {
    jobs: data?.knowledgeBaseArticles?.map((article: any) => ({
      id: article._id,
      title: article.title,
      content: article.content,
      branch: article.summary?.split("#")[0] || "",
      phone: article.summary?.split("#")[1] || "",
      fileUrl: article.attachments?.[0]?.url,
      fileName: article.attachments?.[0]?.name,
    })) as TOpenJob[],
  };
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
      _id
      title
      summary
      content
      createdUser {
        _id
        username
        details {
          avatar
          fullName
        }
      }
      attachments {
        url
      }
      image {
        url
      }
      createdDate
    }
  }
`;
