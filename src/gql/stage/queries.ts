import { gql } from "@apollo/client";

const stages = gql`
  query salesStages(
    $isNotLost: Boolean
    $pipelineId: String!
    $search: String
    $customerIds: [String]
    $companyIds: [String]
    $assignedUserIds: [String]
    $labelIds: [String]
    $extraParams: JSON
    $closeDateType: String
    $assignedToMe: String
    $branchIds: [String]
    $departmentIds: [String]
    $segment: String
    $segmentData: String
    $createdStartDate: Date
    $createdEndDate: Date
    $stateChangedStartDate: Date
    $stateChangedEndDate: Date
    $startDateStartDate: Date
    $startDateEndDate: Date
    $closeDateStartDate: Date
    $closeDateEndDate: Date
    $isAll: Boolean
  ) {
    salesStages(
      isNotLost: $isNotLost
      pipelineId: $pipelineId
      search: $search
      customerIds: $customerIds
      companyIds: $companyIds
      assignedUserIds: $assignedUserIds
      labelIds: $labelIds
      extraParams: $extraParams
      closeDateType: $closeDateType
      assignedToMe: $assignedToMe
      branchIds: $branchIds
      departmentIds: $departmentIds
      segment: $segment
      segmentData: $segmentData
      createdStartDate: $createdStartDate
      createdEndDate: $createdEndDate
      stateChangedStartDate: $stateChangedStartDate
      stateChangedEndDate: $stateChangedEndDate
      startDateStartDate: $startDateStartDate
      startDateEndDate: $startDateEndDate
      closeDateStartDate: $closeDateStartDate
      closeDateEndDate: $closeDateEndDate
      isAll: $isAll
    ) {
      _id
      name
      order
      unUsedAmount
      amount
      itemsTotalCount
      pipelineId
      code
      age
      defaultTick
      probability
      __typename
    }
  }
`;

const queries = {
  stages,
};

export default queries;
