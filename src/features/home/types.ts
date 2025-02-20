import { IAttachment } from "@/types";

export type TCarProduct = {
  name: string;
  description: string;
  _id: string;
  unitPrice: number;
};

export type TAdvice = {
  _id: string;
  image?: IAttachment;
  title: string;
  code: string;
};

export type TInfo = {
  _id: string;
  image?: IAttachment;
  title: string;
  content: string;
};

export type TFaq = {
  _id: string;
  title: string;
  content: string;
  image?: IAttachment;
};
export type TImage = {
  _id: string;
  title: string;
  content: string;
  image?: IAttachment;
};

export type TSliderImage = {
  _id: string;
  image?: IAttachment;
};

export type TWhyAttend = {
  _id: string;
  title: string;
  content: string;
  image?: IAttachment;
};
