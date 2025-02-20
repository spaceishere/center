export type TProductBase = {
  _id: string;
  name: string;
  unitPrice: number;
  isPackage?: boolean;
};

export type CustomField = {
  field: string;
  value: string;
  stringValue: string;
};

export type TProduct = TProductBase & {
  categoryId?: string | null;
  type?: string | null;
  description?: string | null;
  attachment?: { url?: string } | null;
  remainder?: number;
  tagIds?: string[];
  code?: string;
  manufacturedDate?: string;
  hasSimilarity?: boolean;
  customFieldsData?: CustomField[];
};
