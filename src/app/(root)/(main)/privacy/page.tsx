"use client";

import { Container } from "@/components/container";
import { Skeleton } from "@/components/ui/skeleton";
import { queries } from "@/gql/kb";
import { useQuery } from "@apollo/client";

const PrivacyPage = () => {
  const { data, loading } = useQuery(queries.articleDetail, {
    variables: {
      id: "CFyGs1CG7mjy3pejQA6PR",
    },
  });

  if (loading) {
    return (
      <Container className="w-full space-y-7">
        <Skeleton className="h-20 w-2/3" />
        <Skeleton className="h-36 w-3/4" />
        <Skeleton className="h-12 w-1/2" />
      </Container>
    );
  }

  return (
    <Container>
      <div
        className="space-y-5"
        dangerouslySetInnerHTML={{
          __html: data.knowledgeBaseArticleDetail.content,
        }}
      />
    </Container>
  );
};

export default PrivacyPage;
