import { IAttachment } from "@/types";

export type TContent = {
  _id: string;
  title: string;
  content: string;
  attachments?: IAttachment[];
  image?: IAttachment;
  createdDate: Date;
  createdUser?: {
    username?: string;
  };
};

export type TOpenJob = {
  id: string;
  title: string;
  branch: string;
  phone: string;
  content: string;
  fileUrl?: string;
  fileName?: string;
};
