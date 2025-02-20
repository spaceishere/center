"use client";

import { useParams } from "next/navigation";
import { createContext, useContext } from "react";
import { useOrderDetail } from "@/features/order/api/order";

import { Loading } from "@/components/ui/loading";

import { Container } from "@/components/container";
import OrderHeader from "@/features/order/components/order-header";
import OrderGeneral from "@/features/order/components/order-general";
import OrderProducts from "@/features/order/components/order-products";
import OrderUser from "@/features/order/components/order-user";
import OrderAddress from "@/features/order/components/order-address";

import { OrderDetailContext } from "@/features/order/components/order-detail-context";

const OrderDetailPageContent = () => {
  const params = useParams();

  const { id } = params;

  const { loading, orderDetail } = useOrderDetail(id as string);

  if (loading) return <Loading className="py-32" />;

  if (!orderDetail) {
    return <div className="py-32 text-center">Захиалга олдсонгүй</div>;
  }

  return (
    <Container className="space-y-5">
      <OrderDetailContext.Provider value={orderDetail}>
        <OrderHeader />
        <OrderGeneral />
        <OrderProducts />
        <OrderUser />
        <OrderAddress />
      </OrderDetailContext.Provider>
    </Container>
  );
};

export default OrderDetailPageContent;
