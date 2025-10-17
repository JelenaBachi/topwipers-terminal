import { createBrowserRouter, Navigate } from 'react-router-dom';
import { paths } from './paths';
import AppShell from './shell/AppShell';
import StartPage from '@/pages/home/StartPage';
import MakePage from '@/pages/vehicle/MakePage';
import ModelPage from '@/pages/vehicle/ModelPage';
import ModPage from '@/pages/vehicle/ModPage';
import ProductListPage from '@/pages/products/ProductListPage';
import ProductPage from '@/pages/product/ProductPage';
import ProductShelfPage from '@/pages/product/ProductShelfPage';

export const router = createBrowserRouter([
  {
    element: <AppShell />,
    children: [
      { path: paths.home(), element: <StartPage /> },

      { path: paths.vehicle(), element: <MakePage /> },
      { path: paths.vehicleMake(), element: <ModelPage /> },
      { path: paths.vehicleModel(), element: <ModPage /> },
      { path: paths.products(), element: <ProductListPage /> },

      { path: paths.productDetailsPattern, element: <ProductPage /> },
      { path: paths.productShelfPattern, element: <ProductShelfPage /> },

      { path: '*', element: <Navigate to={paths.home()} replace /> },
    ],
  },
]);
