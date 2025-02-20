export type TBrandProduct = {
  _id: string;
  name: string;
  description: string;
  category: {
    _id: string;
    name: string;
  };
  attachment: {
    url: string | null;
  } | null;
};
