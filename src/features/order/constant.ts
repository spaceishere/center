export const ORDER_STATUSES = {
  NEW: "new",
  DOING: "doing",
  REDOING: "reDoing",
  DONE: "done",
  COMPLETE: "complete",
  PENDING: "pending",
  RETURN: "return",

  ALL: ["new", "doing", "done", "complete", "reDoing", "pending", "return"],
  FULL: ["paid", "done", "complete"],
};

export const ORDER_SALE_STATUS = {
  CART: "cart",
  CONFIRMED: "confirmed",
  ALL: ["cart", "confirmed"],
};

export const getOrderStatus = (status: string, paidDate?: string) => {
  if (!paidDate) return "Төлбөр хүлээгдэж байна";
  switch (status) {
    case ORDER_STATUSES.DOING:
      return "Захиалга бэлтгэгдэж байна";
    case ORDER_STATUSES.REDOING:
      return "Захиалга бэлтгэгдэж байна";
    case ORDER_STATUSES.DONE:
      return "Захиалга хүргэлтэнд гарсан";
    case ORDER_STATUSES.COMPLETE:
      return "Захиалга хүргэгдсэн";
    default:
      return "Захиалга баталгаажсан";
  }
};

export const getLabel = (status: string) =>
  statusLabel[status as keyof typeof statusLabel] || status;

export const statusLabel = {
  pending: "Төлбөр хүлээгдэж байна.",
  paid: "Төлбөр төлөгдсөн байна.",
};
