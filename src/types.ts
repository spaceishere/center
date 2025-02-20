import type { QueryOptions } from "@apollo/client";

export interface IPageProps {
  params: { [key: string]: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

export interface CommonParams {
  variables?: QueryOptions["variables"];
}

export type IAttachment = { url?: string; name?: string } | null;

type Workhour = {
  inactive: boolean;
  startFrom?: string;
  endTo?: string;
  lunchStartFrom?: string;
  lunchEndTo?: string;
};

export type TBranch = {
  _id: string;
  title: string;
  address?: string;
  image?: IAttachment;
  workhours?: {
    Monday?: Workhour;
    Tuesday?: Workhour;
    Wednesday?: Workhour;
    Thursday?: Workhour;
    Friday?: Workhour;
    Saturday?: Workhour;
    Sunday?: Workhour;
  } | null;
};

export type CustomerType = "" | "user" | "company";

export type TCustomer = {
  _id: string;
  firstName?: string;
  lastName?: string;
  erxesCustomerId?: string;
  phone?: string;
  email?: string;
  password?: string;
  isEmailVerified?: boolean;
  isPhoneVerified?: boolean;
};

export type TConfig = {
  name: string;
  erxesAppToken: string;
  paymentIds: string[];
  isCheckRemainder: boolean;
  deliveryConfig: {
    productId?: string;
  };
  uiOptions?: {
    logo: string;
    colors: {
      primary?: string;
      secondary?: string;
      third?: string;
    };
    favIcon: string;
  };
};
