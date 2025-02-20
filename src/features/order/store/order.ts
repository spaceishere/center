import { TDeliveryInfo, TOrder, TBillType } from "@/features/order/types";
import { atom } from "jotai";
import { focusAtom } from "jotai-optics";
import { splitAtom } from "jotai/utils";
import { cartTotalAtom } from "@/features/cart/store/cart";
import {
  currentUserAtom,
  deliveryItemIdAtom,
} from "@/features/auth/store/auth";

export const defaultOrderItem = {
  items: [],
  deliveryInfo: null,
  description: "",
};
export const activeOrderAtom = atom<
  | TOrder
  | {
      items: [];
      deliveryInfo: null;
      description: string;
      billType: TBillType;
      registerNumber?: string;
      branchId: string | null;
    }
>({
  items: [],
  deliveryInfo: null,
  description: "",
  billType: "1",
  registerNumber: "",
  branchId: null,
});

export const orderParamsAtom = atom((get) => {
  const {
    items,
    registerNumber,
    billType,
    description,
    deliveryInfo,
    branchId,
    _id,
    saleStatus,
  } = get(activeOrderAtom) as TOrder;
  const totalAmount = get(cartTotalAtom);
  const customerId = get(currentUserAtom)?.erxesCustomerId;
  const deliveryProductId = get(deliveryItemIdAtom);

  return {
    _id,
    items: items
      .filter((item) => item.productId !== deliveryProductId)
      .map(({ _id, count, productId, unitPrice, tagIds }) => ({
        _id,
        count,
        productId,
        unitPrice,
        // tagIds,
      })),
    totalAmount,
    type: "delivery",
    customerId,
    registerNumber,
    billType,
    origin: "kiosk",
    deliveryInfo,
    description,
    branchId,
    saleStatus,
  };
});

export const initialLoadingOrderAtom = atom<boolean>(true);
export const loadingOrderAtom = atom<boolean>(false);

export const cudOrderAtom = atom<boolean>(false);

export const itemsAtom = focusAtom(activeOrderAtom, (optic) =>
  optic.prop("items"),
);

export const filterDeliveryProduct = (
  items: TOrder["items"],
  deliveryProductId?: string,
) => items.filter((item) => item.productId !== deliveryProductId);

export const getDeliveryProduct = (
  items: TOrder["items"],
  deliveryProductId?: string,
) => items.find((item) => item.productId === deliveryProductId);

export const productItemsAtom = atom((get) =>
  filterDeliveryProduct(get(itemsAtom), get(deliveryItemIdAtom)),
);

export const deliveryItemAtom = atom((get) =>
  getDeliveryProduct(get(itemsAtom), get(deliveryItemIdAtom)),
);

export const billTypeAtom = focusAtom(activeOrderAtom, (optic) =>
  optic.prop("billType"),
);

export const registerNumberAtom = focusAtom(activeOrderAtom, (optic) =>
  optic.prop("registerNumber"),
);

export const deliveryInfoAtom = focusAtom(activeOrderAtom, (optic) =>
  optic.prop("deliveryInfo"),
);

export const descriptionAtom = focusAtom(activeOrderAtom, (optic) =>
  optic.prop("description"),
);

export const branchAtom = focusAtom(activeOrderAtom, (optic) =>
  optic.prop("branchId"),
);

export const changeDeliveryInfoAtom = atom(
  (get) => get(loadingOrderAtom),
  (
    get,
    set,
    payload: TDeliveryInfo & {
      registerNumber?: string;
      billType: TBillType;
      branchId: string | null;
    },
  ) => {
    const { billType, registerNumber, branchId, ...v } = payload;

    const params = {
      description: `
        Нэр: ${v.firstName},
        ${v.lastName && `Овог: ${v.lastName},`}
        Утасны дугаар: ${v.lastName},
        И-Мэйл хаяг: ${v.email},
        ------------------------- 
        Хот: ${branchId ? "очиж авна" : v.city},
        Дүүрэг: ${branchId ? "очиж авна" : v.district},
        Хороо: ${branchId ? "очиж авна" : v.street},
        Дэлгэрэнгүй: ${branchId ? "очиж авна" : v.detail},
        Нэмэлт Анхааруулга: ${
          (!branchId && v.haveBaby ? "Нялх хүүхэдтэй, " : "очиж авна") +
          (!branchId && v.callBefore
            ? "Хүргэхийн өмнө заавал залгах, "
            : "очиж авна") +
          (!branchId && v.onlyAfternoon
            ? "Зөвхөн оройн цагаар хүргэх"
            : "очиж авна")
        }
      `,
      deliveryInfo: v,
      billType,
      registerNumber: billType === "3" ? registerNumber : "",
      branchId: branchId ? branchId : null,
    };

    if (
      get(descriptionAtom) !== params.description ||
      get(registerNumberAtom) !== registerNumber ||
      get(billTypeAtom) !== billType
    ) {
      set(cudOrderAtom, true);
      set(activeOrderAtom, (prev) => ({ ...(prev as any), ...params }));
    }
  },
);

export const itemAtomsAtom = splitAtom(itemsAtom);

export const branchInfoAtom = atom<{ id: string; title: string } | null>(null);
