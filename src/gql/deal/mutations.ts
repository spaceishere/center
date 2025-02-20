import { gql } from "@apollo/client";

const dealsAdd = gql`
  mutation dealsAdd(
    $name: String!
    $companyIds: [String]
    $customerIds: [String]
    $labelIds: [String]
    $productsData: JSON
    $paymentsData: JSON
    $parentId: String
    $proccessId: String
    $aboveItemId: String
    $stageId: String
    $startDate: Date
    $closeDate: Date
    $description: String
    $assignedUserIds: [String]
    $order: Int
    $attachments: [AttachmentInput]
    $reminderMinute: Int
    $isComplete: Boolean
    $status: String
    $priority: String
    $sourceConversationIds: [String]
    $customFieldsData: JSON
    $tagIds: [String]
    $branchIds: [String]
    $departmentIds: [String]
  ) {
    dealsAdd(
      name: $name
      companyIds: $companyIds
      customerIds: $customerIds
      labelIds: $labelIds
      productsData: $productsData
      paymentsData: $paymentsData
      parentId: $parentId
      proccessId: $proccessId
      aboveItemId: $aboveItemId
      stageId: $stageId
      startDate: $startDate
      closeDate: $closeDate
      description: $description
      assignedUserIds: $assignedUserIds
      order: $order
      attachments: $attachments
      reminderMinute: $reminderMinute
      isComplete: $isComplete
      status: $status
      priority: $priority
      sourceConversationIds: $sourceConversationIds
      customFieldsData: $customFieldsData
      tagIds: $tagIds
      branchIds: $branchIds
      departmentIds: $departmentIds
    ) {
      products
      productsData
      paymentsData
      unUsedAmount
      amount
      _id
      name
      stageId
      hasNotified
      pipeline {
        _id
        name
        tagId
        isCheckDate
        tag {
          order
          __typename
        }
        __typename
      }
      boardId
      companies {
        _id
        primaryName
        links
        __typename
      }
      __typename
      customers {
        _id
        firstName
        middleName
        lastName
        primaryEmail
        primaryPhone
        visitorContactInfo
        __typename
      }
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
        probability
        type
        defaultTick
        __typename
      }
      isWatched
      attachments {
        name
        url
        type
        size
        __typename
      }
      createdAt
      modifiedAt
      modifiedBy
      reminderMinute
      isComplete
      status
      createdUser {
        _id
        details {
          fullName
          avatar
          __typename
        }
        __typename
      }
      order
      customFieldsData
      score
      timeTrack {
        status
        timeSpent
        startDate
        __typename
      }
      number
      customProperties
      branchIds
      departmentIds
      __typename
    }
  }
`;

const conformityEdit = gql`
  mutation conformityEdit(
    $mainType: String
    $mainTypeId: String
    $relType: String
    $relTypeIds: [String]
  ) {
    conformityEdit(
      mainType: $mainType
      mainTypeId: $mainTypeId
      relType: $relType
      relTypeIds: $relTypeIds
    ) {
      success
      __typename
    }
  }
`;

const mutation = {
  dealsAdd,
  conformityEdit,
};

export default mutation;
