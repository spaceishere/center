import { gql } from "@apollo/client";

const commonFields = `
  _id
  name
  code

`;

const productCategories = gql`
  query poscProductCategories ($parentId: String, $searchValue: String, $excludeEmpty: Boolean, $meta: String, $page: Int, $perPage: Int, $sortField: String, $sortDirection: Int) {
    poscProductCategories(parentId: $parentId, searchValue: $searchValue, excludeEmpty: $excludeEmpty, meta: $meta, page: $page, perPage: $perPage, sortField: $sortField, sortDirection: $sortDirection) {
      ${commonFields}
      order
      parentId
      attachment {
        url
      }
    }
  }
`;

const poscProducts = gql`
  query poscProdffucts(
    $categoryId: String
    $tag: String
    $page: Int
    $perPage: Int
    $searchValue: String
    $sortDirection: Int
    $sortField: String
    $ids: [String]
  ) {
    poscProducts(
      categoryId: $categoryId
      tag: $tag
      page: $page
      perPage: $perPage
      searchValue: $searchValue
      sortDirection: $sortDirection
      sortField: $sortField
      ids: $ids
    ) {
      _id
      name
      code
      unitPrice
      description
      remainder
      createdAt
      tagIds
      attachment {
        url
        __typename
      }
      category {
        _id
        name
      }
      __typename
    }
  }
`;

const products = gql`
  query products(
    $type: String
    $categoryId: String
    $tag: String
    $status: String
    $searchValue: String
    $vendorId: String
    $brand: String
    $perPage: Int
    $page: Int
    $ids: [String]
    $excludeIds: Boolean
    $pipelineId: String
    $boardId: String
    $segment: String
    $segmentData: String
  ) {
    products(
      type: $type
      categoryId: $categoryId
      tag: $tag
      status: $status
      searchValue: $searchValue
      vendorId: $vendorId
      brand: $brand
      perPage: $perPage
      page: $page
      ids: $ids
      excludeIds: $excludeIds
      pipelineId: $pipelineId
      boardId: $boardId
      segment: $segment
      segmentData: $segmentData
    ) {
      _id
      name
      shortName
      type
      code
      categoryId
      vendorId
      vendor {
        _id
        avatar
        businessType
        code
        createdAt
        customFieldsData
        description
        emails
        industry
        isSubscribed
        links
        location
        mergedIds
        modifiedAt
        names
        ownerId
        parentCompanyId
        phones
        plan
        primaryEmail
        primaryName
        primaryPhone
        score
        size
        tagIds
        trackedData
        website
        __typename
      }
      scopeBrandIds
      status
      description
      unitPrice
      barcodes
      variants
      barcodeDescription
      getTags {
        _id
        name
        colorCode
        __typename
      }
      tagIds
      createdAt
      category {
        _id
        code
        name
        __typename
      }
      attachment {
        url
        name
        size
        type
        __typename
      }
      attachmentMore {
        url
        name
        size
        type
        __typename
      }
      uom
      subUoms
      taxType
      taxCode
      __typename
    }
  }
`;

const productsMeta = gql`
  query poscProducts($perPage: Int) {
    poscProducts(perPage: $perPage, isKiosk: true) {
      _id
      modifiedAt
    }
  }
`;

const productSimilarities = gql`
  query PoscProductSimilarities($id: String!, $groupedSimilarity: String) {
    poscProductSimilarities(_id: $id, groupedSimilarity: $groupedSimilarity) {
      products {
        _id
        description
        unitPrice
        name
        attachment {
          url
        }
        customFieldsData
      }
      groups {
        fieldId
        title
      }
    }
  }
`;

const productsCount = gql`
  query productsCount(
    $categoryId: String
    $type: String
    $searchValue: String
    $groupedSimilarity: String
    $isKiosk: Boolean
    $tag: String
  ) {
    poscProductsTotalCount(
      categoryId: $categoryId
      type: $type
      searchValue: $searchValue
      groupedSimilarity: $groupedSimilarity
      isKiosk: $isKiosk
      tag: $tag
    )
  }
`;

const getPriceInfo = gql`
  query getPriceInfo($productId: String!) {
    getPriceInfo(productId: $productId)
  }
`;

const getInitialCategory = gql`
  query InitialCategory($_id: String) {
    poscProductCategoryDetail(_id: $_id) {
      _id
      name
    }
  }
`;

const getKioskCategory = gql`
  query InitialCategory($_id: String) {
    poscProductCategoryDetail(_id: $_id) {
      _id
      name
      attachment {
        url
      }
    }
  }
`;

const productDetail = gql`
  query productDetail($_id: String) {
    productDetail(_id: $_id) {
      _id
      name
      shortName
      description
      unitPrice
      categoryId
      category {
        _id
        code
        name
      }
      getTags {
        _id
        name
        colorCode
      }
      attachment {
        url
        name
      }
      attachmentMore {
        url
        name
      }
      createdAt
    }
  }
`;

const poscProductDetail = gql`
  query ProductDetail($_id: String) {
    poscProductDetail(_id: $_id) {
      _id
      name
      description
      code
      type
      createdAt
      unitPrice
      category {
        name
        _id
      }

      attachment {
        url
      }
      remainders
      remainder
      attachmentMore {
        url
      }
      shortName
    }
  }
`;

const productReview = gql`
  query Productreview($productId: String!) {
    productreview(productId: $productId) {
      average
      length
      productId
    }
  }
`;
const productTags = gql`
  query productDetail($_id: String) {
    productDetail(_id: $_id) {
      _id
      tagIds
    }
  }
`;

const queries = {
  productCategories,
  products,
  productsCount,
  productSimilarities,
  productDetail,
  productsMeta,
  productReview,
  poscProducts,
  poscProductDetail,
  productTags,
};

export default queries;
