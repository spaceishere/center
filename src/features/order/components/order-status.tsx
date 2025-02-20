import { useDetail } from "@/features/order/components/order-detail-context";
import { getOrderStatus } from "../constant";

const OrderStatus = () => {
  const { status, paidDate } = useDetail();

  return <div>{getOrderStatus(status || "", paidDate)}</div>;
};

export default OrderStatus;
