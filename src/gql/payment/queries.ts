import { gql } from "@apollo/client";

export const payments = gql`
  query PaymentsPublic($kind: String, $ids: [String]) {
    paymentsPublic(kind: $kind, _ids: $ids) {
      _id
      kind
      name
    }
  }
`;

const queries = { payments };

export default queries;
