import { gql } from "@apollo/client";

const createInvoice = gql`
  mutation InvoiceCreate(
    $amount: Float!
    $phone: String
    $email: String
    $description: String
    $customerId: String
    $customerType: String
    $contentType: String
    $contentTypeId: String
    $redirectUri: String
    $paymentIds: [String]
    $data: JSON
    $callback: String
  ) {
    invoiceCreate(
      amount: $amount
      phone: $phone
      email: $email
      description: $description
      customerId: $customerId
      customerType: $customerType
      contentType: $contentType
      contentTypeId: $contentTypeId
      redirectUri: $redirectUri
      paymentIds: $paymentIds
      data: $data
      callback: $callback
    ) {
      _id
      amount
      phone
      email
      description
      status
      data
      contentTypeId
    }
  }
`;

export const addTransaction = gql`
  mutation TransactionsAdd(
    $invoiceId: String!
    $paymentId: String!
    $amount: Float!
    $details: JSON
  ) {
    paymentTransactionsAdd(
      invoiceId: $invoiceId
      paymentId: $paymentId
      amount: $amount
      details: $details
    ) {
      _id
      amount
      invoiceId
      paymentId
      paymentKind
      status
      response
      details
    }
  }
`;

const checkInvoice = gql`
  mutation invoicesCheck($_id: String!) {
    invoicesCheck(_id: $_id)
  }
`;

const mutations = { createInvoice, checkInvoice, addTransaction };

export default mutations;
