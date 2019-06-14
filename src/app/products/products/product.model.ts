export interface IProduct {
  id: string;
  images?: string[];
  name: string;
  warranty: {
    years: number;
    months: number;
  };
  internal_information: IInternalProductInfo;
  general_information: { field: string, value: string }[];
  technical_information: { field: string, value: string }[];
}

export interface IInternalProductInfo {
  purchase_date: string;
  purchase_from: string;
  purchase_price: number;
  sale_price: number;
  quantity: number;
}
