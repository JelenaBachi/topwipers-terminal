import { generatePath } from 'react-router-dom';

export const paths = {
  home: () => '/',
  vehicle: () => '/vehicle',
  vehicleMake: () => '/vehicle/make',
  vehicleModel: () => '/vehicle/make/model',
  products: () => '/products',
  product: () => '/products/product',

  productDetailsPattern: '/products/:productId',
  productShelfPattern: '/products/:productId/shelf',

  productDetails: (productId: string) => generatePath('/products/:productId', { productId }),
  productShelf: (productId: string) => generatePath('/products/:productId/shelf', { productId }),
};
