import { gql } from "@apollo/client";

const serviceHistory = gql`
  query deals(
    $mainType: String
    $mainTypeId: String
    $relType: String
    $isSaved: Boolean
    $noSkipArchive: Boolean
    $limit: Int
  ) {
    deals(
      limit: $limit
      noSkipArchive: $noSkipArchive
      conformityIsSaved: $isSaved
      conformityMainType: $mainType
      conformityMainTypeId: $mainTypeId
      conformityRelType: $relType
    ) {
      _id
      stage
    }
  }
`;

const dealDetailLow = gql`
  query dealDetail($id: String!) {
    dealDetail(_id: $id) {
      products
      productsData
      paymentsData
      unUsedAmount
      amount
      _id
      name
      stageId
      hasNotified
      boardId
      __typename
      __typename
      tags {
        _id
        name
        colorCode
        __typename
      }
      tagIds
      startDate
      closeDate
      description
      priority
      assignedUsers {
        _id
        username
        email
        isActive
        details {
          avatar
          fullName
          __typename
        }
        __typename
      }
      labels {
        _id
        name
        colorCode
        __typename
      }
      labelIds
      stage {
        name
        probability
        type
        defaultTick
        __typename
      }
      isWatched
      createdAt
      modifiedAt
      modifiedBy
      reminderMinute
      isComplete
      status
      order
      number
    }
  }
`;

const deals = gql`
  query deals(
    $initialStageId: String
    $stageId: String
    $skip: Int
    $limit: Int
    $_ids: [String]
    $companyIds: [String]
    $customerIds: [String]
    $assignedUserIds: [String]
    $productIds: [String]
    $labelIds: [String]
    $search: String
    $priority: [String]
    $date: ItemDate
    $pipelineId: String
    $parentId: String
    $closeDateType: String
    $sortField: String
    $sortDirection: Int
    $userIds: [String]
    $segment: String
    $segmentData: String
    $assignedToMe: String
    $startDate: String
    $endDate: String
    $tagIds: [String]
    $noSkipArchive: Boolean
    $branchIds: [String]
    $departmentIds: [String]
    $mainType: String
    $mainTypeId: String
    $relType: String
    $isRelated: Boolean
    $isSaved: Boolean
    $createdStartDate: Date
    $createdEndDate: Date
    $stateChangedStartDate: Date
    $stateChangedEndDate: Date
    $startDateStartDate: Date
    $startDateEndDate: Date
    $closeDateStartDate: Date
    $closeDateEndDate: Date
    $pipelineIds: [String]
  ) {
    deals(
      initialStageId: $initialStageId
      stageId: $stageId
      skip: $skip
      limit: $limit
      _ids: $_ids
      companyIds: $companyIds
      customerIds: $customerIds
      assignedUserIds: $assignedUserIds
      priority: $priority
      productIds: $productIds
      labelIds: $labelIds
      search: $search
      date: $date
      pipelineId: $pipelineId
      parentId: $parentId
      closeDateType: $closeDateType
      sortField: $sortField
      sortDirection: $sortDirection
      userIds: $userIds
      segment: $segment
      segmentData: $segmentData
      assignedToMe: $assignedToMe
      startDate: $startDate
      endDate: $endDate
      tagIds: $tagIds
      noSkipArchive: $noSkipArchive
      branchIds: $branchIds
      departmentIds: $departmentIds
      conformityMainType: $mainType
      conformityMainTypeId: $mainTypeId
      conformityRelType: $relType
      conformityIsRelated: $isRelated
      conformityIsSaved: $isSaved
      createdStartDate: $createdStartDate
      createdEndDate: $createdEndDate
      stateChangedStartDate: $stateChangedStartDate
      stateChangedEndDate: $stateChangedEndDate
      startDateStartDate: $startDateStartDate
      startDateEndDate: $startDateEndDate
      closeDateStartDate: $closeDateStartDate
      closeDateEndDate: $closeDateEndDate
      pipelineIds: $pipelineIds
    ) {
      products
      unUsedAmount
      amount
      _id
      name
      companies
      customers
      assignedUsers
      labels
      stage
      isComplete
      isWatched
      relations
      startDate
      closeDate
      createdAt
      modifiedAt
      priority
      hasNotified
      score
      number
      tagIds
      customProperties
      status
      __typename
    }
  }
`;

const checkListDetail = gql`
  query checklistDetail($_id: String!) {
    checklistDetail(_id: $_id) {
      _id
      contentType
      contentTypeId
      title
      createdUserId
      createdDate
      items {
        _id
        checklistId
        isChecked
        content
        __typename
      }
      percent
      __typename
    }
  }
`;

const checkLists = gql`
  query salesChecklists($contentType: String, $contentTypeId: String) {
    salesChecklists(contentType: $contentType, contentTypeId: $contentTypeId) {
      _id
      contentType
      contentTypeId
      title
      createdUserId
      createdDate
      items {
        _id
        checklistId
        isChecked
        content
        __typename
      }
      __typename
    }
  }
`;

const queries = {
  deals,
  serviceHistory,
  dealDetailLow,
  checkListDetail,
  checkLists,
};

export default queries;
