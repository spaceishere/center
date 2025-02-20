import { Fragment } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import OrderSummary from "@/features/checkout/components/order-summary/order-summary";
import { CheckoutHeader } from "@/features/checkout/components/checkout-header";
import CartPageContent from "@/features/checkout/components/cart-page-content";
const CartPage = () => {
  return (
    <Fragment>
      <CheckoutHeader
        title="Таны сагс"
        backTitle="Дэлгүүр рүү буцах"
        backUrl="/primart"
      />

      <div className="md:grid md:grid-cols-12 md:gap-x-6">
        <CartPageContent>
          <OrderSummary className="col-span-5 h-fit md:sticky md:top-40">
            <Button asChild size={"lg"} className="w-full">
              <Link href="/address">Худалдан авах</Link>
            </Button>
          </OrderSummary>
        </CartPageContent>
      </div>
    </Fragment>
  );
};

export default CartPage;
