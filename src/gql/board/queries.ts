import { DocumentNode, gql } from "@apollo/client";

const boards: DocumentNode = gql`
  query salesBoards($type: String!) {
    salesBoards(type: $type) {
      _id
      name
      pipelines {
        _id
        name
        __typename
      }
      __typename
    }
  }
`;

const availableTimes: DocumentNode = gql`
  query salesCheckFreeTimes($intervals: [SalesInterval], $pipelineId: String) {
    salesCheckFreeTimes(intervals: $intervals, pipelineId: $pipelineId)
  }
`;

const boardDetail = gql`
  query salesBoardDetail($_id: String!) {
    salesBoardDetail(_id: $_id) {
      _id
      name
      type
      __typename
    }
  }
`;

const queries = {
  boards,
  availableTimes,
  boardDetail,
};

export default queries;
