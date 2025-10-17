export type Availability = {
  inStock: boolean;
  label?: string;
};

export type SecondaryAction = {
  label: string;
  href?: string;
};

export type Planogram = {
  aisle?: string;
  bay?: string;
  shelf?: string;
  position?: string;
};

export type ProductMedia = {
  gallery: string[];
  video?: {
    url: string;
    qr: string;
  };
};

export type LabelTag = {
  label: string;
  color?: string;
  background?: string;
};

export type FlagTag = {
  id: string;
  label: string;
};

export type ProductStoreInfo = {
  shopId: string;
  title: string;
  productImages: string[];
  shelfImage?: string;
  planogram?: Planogram;
};

export type Product = {
  id: string;
  name: string;
  sku: string;
  brand?: string;
  imgUrl?: string;
  price?: number;
  features?: string[];
  labels?: LabelTag[];
  flags?: FlagTag[];
  availability?: Availability;
  media?: ProductMedia;
  storeInfo?: ProductStoreInfo;
  secondaryAction?: SecondaryAction;
};

export type ProductGroupMap = Record<
  string,
  {
    name: string;
    items: Product[];
  }
>;

export type ProductProperty = { name: string; value: string };

export type ShelfData = {
  title: string;
  img: string;
  planogram: Planogram;
};

export type ProductStoreInfoDetail = {
  title: string;
  gallery: string[];
  shelfData: ShelfData;
  shopId?: string;
};

export type ProductDetail = {
  title: string;
  properties: ProductProperty[];
  media: ProductMedia;
  price: number;
  storeInfo: ProductStoreInfoDetail;
  labels?: LabelTag[];
  flags?: FlagTag[];
};
