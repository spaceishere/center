import { updateCartAtom } from "@/features/cart/store/cart";
import { useSetAtom } from "jotai";
import { Button } from "@/components/ui/button";
import { XIcon } from "lucide-react";
import { memo } from "react";

const CartItemDelete = ({ _id }: { _id: string }) => {
  const changeCartItem = useSetAtom(updateCartAtom);
  return (
    <Button
      size="sm"
      className="h-5 rounded-full px-1"
      onClick={() => changeCartItem({ _id, count: 0 })}
    >
      <XIcon className="h-3 w-3" />
    </Button>
  );
};

export default memo(CartItemDelete);
