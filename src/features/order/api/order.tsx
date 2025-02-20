import {
  type ApolloError,
  useMutation,
  BaseMutationOptions,
  useQuery,
  OperationVariables,
  useLazyQuery,
} from "@apollo/client";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { useEffect, useMemo } from "react";
import { toast } from "sonner";

import { onError } from "@/lib/utils";
import { ORDER_SALE_STATUS, ORDER_STATUSES } from "@/features/order/constant";
import { mutations, queries } from "@/gql/order";

import {
  activeOrderAtom,
  cudOrderAtom,
  defaultOrderItem,
  initialLoadingOrderAtom,
  loadingOrderAtom,
  orderParamsAtom,
} from "@/features/order/store/order";
import { TOrder, OrderItem } from "@/features/order/types";
import { currentUserAtom } from "@/features/auth/store/auth";
import { localCartAtom } from "@/features/cart/store/cart";
import { refetchOrderDetailAtom } from "@/features/order/store/payment";

const refetchQueries = ["CurrentOrder"];

export const useOrderCUD = () => {
  const params = useAtomValue(orderParamsAtom);
  const [triggerCUDOrder, changeTrigger] = useAtom(cudOrderAtom);
  const setLoading = useSetAtom(loadingOrderAtom);
  const { _id, items } = params;

  const onError = (error: ApolloError) => {
    setLoading(false);
    changeTrigger(false);
    toast.error(`ERROR: ${error.message}`);
  };

  const [add] = useMutation(mutations.ordersAdd, {
    onError,
    refetchQueries,
    variables: params,
  });
  const [edit] = useMutation(mutations.ordersEdit, {
    onError,
    refetchQueries,
    variables: params,
  });

  const [remove] = useMutation(mutations.ordersCancel, {
    onError,
    refetchQueries,
    variables: params,
  });

  useEffect(() => {
    if (triggerCUDOrder) {
      setLoading(true);
      if (_id) {
        if (items.length > 0) {
          edit();
        } else {
          remove();
        }
      } else {
        add({ variables: params });
      }
    }
  }, [triggerCUDOrder, params, _id, items]);

  return {};
};

export const useOrderChangeSaleStatus = () => {
  const { _id } = useAtomValue(activeOrderAtom) as TOrder;

  const [change, { loading }] = useMutation(mutations.orderChangeSaleStatus, {
    refetchQueries,
    onError,
  });

  const handleConfirm = (onCompleted?: BaseMutationOptions["onCompleted"]) => {
    change({
      variables: {
        _id,
        saleStatus: ORDER_SALE_STATUS.CONFIRMED,
      },
      onCompleted,
    });
  };

  return { handleConfirm, loading };
};

export const useCancelOrder = () => {
  const [cancel, { loading }] = useMutation(mutations.ordersCancel, {
    onError,
  });

  return { cancel, loading };
};

export const useCurrentOrder = () => {
  const { erxesCustomerId } = useAtomValue(currentUserAtom) || {};
  const setCurrentAtom = useSetAtom(activeOrderAtom);
  const [localCart, setLocalCart] = useAtom(localCartAtom);
  const setLoadingOrder = useSetAtom(loadingOrderAtom);
  const setInitialLoadingOrder = useSetAtom(initialLoadingOrderAtom);
  const setTriggerCRUD = useSetAtom(cudOrderAtom);

  const { data, error, loading } = useQuery(queries.currentOrder, {
    variables: {
      customerId: erxesCustomerId,
      statuses: ORDER_STATUSES.ALL,
      saleStatus: ORDER_SALE_STATUS.CART,
      perPage: 1,
      page: 1,
      sortField: "createdAt",
      sortDirection: -1,
    },
    skip: !erxesCustomerId,
  });

  const fullOrders = useMemo(() => data?.fullOrders, [data]);

  useEffect(() => {
    if (fullOrders) {
      const currentOrder = (fullOrders || [])[0];
      setLoadingOrder(false);
      setInitialLoadingOrder(false);
      setTriggerCRUD(false);

      setCurrentAtom(currentOrder || defaultOrderItem);
      if (localCart.length > 0) {
        if (!currentOrder) {
          setCurrentAtom({
            ...currentOrder,
            items: localCart,
          });
        } else {
          setCurrentAtom({
            ...currentOrder,
            items: syncCarts(localCart, currentOrder.items),
          });
        }
        setTriggerCRUD(true);
        setLocalCart([]);
      }
    }
  }, [fullOrders]);

  const currentOrder = (fullOrders || [])[0];

  return { loading, currentOrder, error };
};

const syncCarts = (localCart: OrderItem[], items: OrderItem[]) => {
  const synchronizedCart = localCart.map((localItem) => {
    const matchingSavedItem = items.find(
      (savedItem) => savedItem.productId === localItem.productId,
    );
    if (matchingSavedItem) {
      // If the product exists in the saved cart, update the count by summing the values
      return { ...localItem, count: localItem.count + matchingSavedItem.count };
    } else {
      return localItem;
    }
  });

  items.forEach((savedItem) => {
    const isAlreadyInLocalCart = synchronizedCart.some(
      (localItem) => localItem.productId === savedItem.productId,
    );
    if (!isAlreadyInLocalCart) {
      synchronizedCart.push(savedItem);
    }
  });

  return synchronizedCart;
};

export const useFullOrders = (props?: { variables?: OperationVariables }) => {
  const { variables } = props || {};
  const { erxesCustomerId } = useAtomValue(currentUserAtom) || {};
  const { data, loading, refetch } = useQuery(queries.fullOrders, {
    variables: {
      customerId: erxesCustomerId,
      statuses: ORDER_STATUSES.ALL,
      saleStatus: ORDER_SALE_STATUS.CONFIRMED,
      sortField: "createdAt",
      sortDirection: -1,
      ...variables,
    },
    onError,
    skip: !erxesCustomerId,
  });

  const fullOrders = useMemo(() => data?.fullOrders, [data]);

  return { fullOrders, loading, refetch };
};

export const useOrderDetail = (id: string) => {
  const { erxesCustomerId } = useAtomValue(currentUserAtom) || {};
  const [refetchOrder, setRefetchOrder] = useAtom(refetchOrderDetailAtom);
  const { data, loading, refetch } = useQuery(queries.orderDetail, {
    variables: {
      customerId: erxesCustomerId,
      id,
    },
    onCompleted() {
      setRefetchOrder(false);
    },
    onError,
  });

  const { orderDetail } = data || {};
  const { _id } = orderDetail || {};

  useEffect(() => {
    if (_id && refetchOrder) {
      refetch();
    }
  }, [_id, refetchOrder]);

  return { orderDetail, loading };
};

export const useCheckRegister = (onCompleted?: (name: string) => void) => {
  const [checkRegister, { loading }] = useLazyQuery(
    queries.ordersCheckCompany,
    {
      onError,
      onCompleted(data) {
        const { found, name } = (data || {}).ordersCheckCompany || {};

        onCompleted && onCompleted(!found ? "" : name || "Demo company");
      },
    },
  );
  return { checkRegister, loading };
};
