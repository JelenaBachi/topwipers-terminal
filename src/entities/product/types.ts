export type Availability = {
  inStock: boolean;
  label?: string;
};

export type SecondaryAction = {
  label: string;
  href?: string;
};

export type Product = {
  id: string;
  name: string;
  sku: string;
  brand?: string;
  price?: number;
  imgUrl?: string;
  features?: string[];
  labels?: string[];
  availability?: Availability;
  detailsHref?: string;
  secondaryAction?: SecondaryAction;
};

export type ProductGroupMap = Record<
  string,
  {
    name: string;
    items: Product[];
  }
>;