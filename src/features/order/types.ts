import { TCustomer, CustomerType } from "@/types";

export type TOrderItemStatus = "new" | "done" | "confirm";

export type TPayment = {
  _id: string;
  name: string;
  kind: string;
};

export type TInvoice = {
  _id: string;
  amount: number;
  phone: string;
  email: string;
  description: string;
  status: string;
  contentType: string;
  contentTypeId: string;
  data: string;
};

export interface OrderItemInput {
  _id: string;
  productId: string;
  count: number;
  unitPrice: number;
  isPackage?: boolean;
  isTake?: boolean;
  status?: TOrderItemStatus;
  manufacturedDate?: string;
  tagIds?: string[];
}

export interface OrderItem extends OrderItemInput {
  createdAt?: string;
  categoryId?: string;
  orderId?: string;
  discountAmount?: number;
  productName?: string;
  productImgUrl?: string;
  attachment?: { url?: string } | null;
  description?: string;
}

export type TOrderStatus =
  | "new"
  | "doing"
  | "done"
  | "complete"
  | "reDoing"
  | "pending";

export type TOrderType =
  | "eat"
  | "take"
  | "delivery"
  | "loss"
  | "spend"
  | "reject";

export type TBillType = "1" | "3" | "9" | null;

export type TOrigin = "" | "kiosk";

export type TOrderCommon = {
  totalAmount: number;
  type?: TOrderType;
  customerId?: string;
  customerType?: CustomerType;
  description?: string;
  billType?: TBillType;
  registerNumber?: string;
  slotCode?: string;
  origin?: TOrigin;
  dueDate?: string;
  branchId?: string;
};

export type TOrderCreate = TOrderCommon & {
  items: OrderItemInput[];
};

export type TOrderUpdate = TOrderCommon & {
  _id: string;
};

export type TPutResponse = {
  id?: string;
  lottery?: string;
  qrData?: string;
  totalAmount?: number;
  customerTin?: string;
  customerName?: string;
};

export type TOrderUser = {
  _id: string;
  primaryPhone: string | null;
  firstName: string | null;
  primaryEmail: string | null;
  lastName: string | null;
};

export type TDeliveryInfo = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  city: string;
  district: string;
  street: string;
  detail: string;
  haveBaby: boolean;
  callBefore: boolean;
  onlyAfternoon: boolean;
  companyName?: string;
};

export type TOrder = TOrderCommon & {
  _id: string;
  createdAt: string;
  modifiedAt?: string;
  paidDate?: string;
  cashAmount?: number;
  mobileAmount?: number;
  directDiscount?: number;
  billType: TBillType;
  registerNumber?: string;
  deliveryInfo?: TDeliveryInfo | null;
  description?: string;
  number?: string;
  status?: TOrderStatus;
  customer?: TCustomer;
  items: OrderItem[];
  putResponses: TPutResponse[];
  user: TOrderUser;
  sloteCode?: string;
  isPre?: boolean;
  saleStatus: string;
  branchId: string | null;
};

export interface TOrderHistory {
  _id: string;
  status: string;
  number: string;
  totalAmount: number;
  type: string;
  createdAt: string;
  modifiedAt: string;
  paidDate: string;
}

export type IPaymentAmountType = "amount" | "percent" | "items";
export type PayByProductItem = {
  _id: string;
  count: number;
  unitPrice: number;
};

export type TGetUserOrders = {
  _id: string;
  createdAt: Date;
  paidData?: Date;
  status: string;
  totalAmount: number;
  number: string | number;
  items: {
    productName: string;
    productImgUrl: string;
  }[];
}[];
