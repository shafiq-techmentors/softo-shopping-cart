export type cartItemType = {
  id: number;
  title: string;
  subheader?: string;
  price: number;
  code: string;
  description: string;
  quantity?: any;
};

export type cartTypes = {
  [x: string]: any;
  id: number;
  colour: string;
  name: string;
  price: number;
  img: string;
  quantity?: any;
};
