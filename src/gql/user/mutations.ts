import { DocumentNode, gql } from "@apollo/client";

const shareScore: DocumentNode = gql`
  mutation shareScore(
    $ownerType: String
    $ownerId: String
    $score: Float
    $destinationOwnerId: String
    $destinationPhone: String
    $destinationEmail: String
    $destinationCode: String
  ) {
    shareScore(
      ownerType: $ownerType
      ownerId: $ownerId
      score: $score
      destinationOwnerId: $destinationOwnerId
      destinationPhone: $destinationPhone
      destinationEmail: $destinationEmail
      destinationCode: $destinationCode
    )
  }
`;

const mutations = { shareScore };

export default mutations;
