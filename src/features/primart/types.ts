import { IAttachment } from "@/types";

export type TProductDetail = {
  _id: string;
  name: string;
  category: {
    name: string;
    _id: string;
  };
  attachment: IAttachment;
  description: string;
  shortName: string;
  unitPrice: number;
  remainder: number;
  remainders: any;
  tagIds: string[];
  code: string;
};

export type TProduct = {
  _id: string;
  name: string;
  attachment: IAttachment;
  unitPrice: number;
  remainder: number;
  tagIds: string[];
  code: string;
};

export type TCategory = {
  _id: string;
  name: string;
};
