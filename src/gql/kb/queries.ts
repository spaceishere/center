import { gql } from "@apollo/client";

const articleDetail = gql`
  query kbArticleDetail($id: String!) {
    knowledgeBaseArticleDetail(_id: $id) {
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

const articles = gql`
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

const kbCategory = gql`
  query knowledgeBaseCategoryDetail($_id: String!) {
    knowledgeBaseCategoryDetail(_id: $_id) {
      _id
      title
      description
      articles {
        _id
        title
        summary
        content
        image {
          url
        }
      }
    }
  }
`;

const GET_KNOWLEDGE_BASE_ARTICLES = gql`
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
      status
      reactionChoices
      reactionCounts
      createdBy
      topicId
      categoryId
      createdUser {
        _id
        username
        email
        details {
          avatar
          fullName
        }
      }
      attachments {
        name
        url
        type
        size
        duration
      }
      image {
        name
        url
        type
        size
      }
      createdDate
      modifiedBy
      modifiedDate
      forms {
        brandId
        formId
      }
    }
  }
`;

const queries = {
  articleDetail,
  articles,
  kbCategory,
  GET_KNOWLEDGE_BASE_ARTICLES,
};

export default queries;
