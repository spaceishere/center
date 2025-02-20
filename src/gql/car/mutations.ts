import { DocumentNode, gql } from "@apollo/client";

const carsEdit: DocumentNode = gql`
  mutation carsEdit(
    $_id: String!
    $ownerId: String
    $description: String
    $plateNumber: String
    $vinNumber: String
    $colorCode: String
    $categoryId: String
    $bodyType: String
    $fuelType: String
    $gearBox: String
    $vintageYear: Float
    $importYear: Float
    $attachment: AttachmentInput
    $customFieldsData: JSON
  ) {
    carsEdit(
      _id: $_id
      ownerId: $ownerId
      description: $description
      plateNumber: $plateNumber
      vinNumber: $vinNumber
      colorCode: $colorCode
      categoryId: $categoryId
      bodyType: $bodyType
      fuelType: $fuelType
      gearBox: $gearBox
      vintageYear: $vintageYear
      importYear: $importYear
      attachment: $attachment
      customFieldsData: $customFieldsData
    ) {
      ownerId
      description
      plateNumber
      vinNumber
      colorCode
      bodyType
      fuelType
      gearBox
      vintageYear
      importYear
      __typename
    }
  }
`;

const carsAdd: DocumentNode = gql`
  mutation carsAdd(
    $ownerId: String
    $description: String
    $plateNumber: String
    $vinNumber: String
    $colorCode: String
    $categoryId: String
    $bodyType: String
    $fuelType: String
    $gearBox: String
    $vintageYear: Float
    $importYear: Float
    $attachment: AttachmentInput
    $customFieldsData: JSON
  ) {
    carsAdd(
      ownerId: $ownerId
      description: $description
      plateNumber: $plateNumber
      vinNumber: $vinNumber
      colorCode: $colorCode
      categoryId: $categoryId
      bodyType: $bodyType
      fuelType: $fuelType
      gearBox: $gearBox
      vintageYear: $vintageYear
      importYear: $importYear
      attachment: $attachment
      customFieldsData: $customFieldsData
    ) {
      _id
      plateNumber
      vinNumber
      colorCode
      bodyType
      fuelType
      gearBox
      vintageYear
      importYear
      __typename
    }
  }
`;

const confirmityEdit = gql`
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

const carsDelete: DocumentNode = gql`
  mutation carsRemove($carIds: [String]) {
    carsRemove(carIds: $carIds)
  }
`;

const mutations = { carsAdd, carsDelete, carsEdit, confirmityEdit };

export default mutations;
