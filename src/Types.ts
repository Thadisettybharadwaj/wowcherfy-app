export type ProductType = {
  id?: string;
  name: string;
  unitPrice?: number;
  sold: number;
}[];

export type TableDataType = {
  branchId: string;
  products: ProductType;
};
