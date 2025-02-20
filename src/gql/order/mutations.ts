import { gql } from "@apollo/client";

const addEditParamDefs = `$items: [OrderItemInput], $totalAmount: Float!, $type: String!, $customerId: String, $registerNumber: String, $billType: String, $origin: String, $dueDate: Date, $branchId: String, $deliveryInfo: JSON, $description: String, $saleStatus: String`;

const addEditParams = `items: $items, totalAmount: $totalAmount, type: $type, customerId: $customerId, registerNumber: $registerNumber, billType: $billType, origin: $origin, dueDate: $dueDate, branchId: $branchId, deliveryInfo: $deliveryInfo, description: $description, saleStatus: $saleStatus`;

const ordersAdd = gql`
  mutation ordersAdd(${addEditParamDefs}) {
    ordersAdd(${addEditParams}) {
     _id
    }
  }
`;

const ordersEdit = gql`
  mutation ordersEdit($_id: String!, ${addEditParamDefs}) {
    ordersEdit(_id: $_id, ${addEditParams}) {
      _id,
      status
    }
  }
`;

const orderChangeSaleStatus = gql`
  mutation OrderChangeSaleStatus($_id: String!, $saleStatus: String) {
    orderChangeSaleStatus(_id: $_id, saleStatus: $saleStatus) {
      _id
    }
  }
`;

const ordersCancel = gql`
  mutation OrdersCancel($_id: String!) {
    ordersCancel(_id: $_id)
  }
`;

const mutations = {
  ordersAdd,
  ordersEdit,
  ordersCancel,
  orderChangeSaleStatus,
};

export default mutations;
