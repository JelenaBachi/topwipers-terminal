import { createBrowserRouter, Navigate } from 'react-router-dom';
import AppShell from './shell/AppShell';
import StartPage from '@/pages/home/StartPage';
import MakePage from '@/pages/vehicle/MakePage';
import ModelPage from '@/pages/vehicle/ModelPage';
import ModPage from '@/pages/vehicle/ModPage';
import ProductListPage from '@/pages/products/ProductListPage';

export const router = createBrowserRouter([
  {
    element: <AppShell />,
    children: [
      { path: '/', element: <StartPage /> },
      { path: '/vehicle', element: <MakePage /> },
      { path: '/vehicle/models', element: <ModelPage /> },
      { path: '/vehicle/mods', element: <ModPage /> },
      { path: '/products', element: <ProductListPage /> },
      { path: '*', element: <Navigate to="/" replace /> },
    ],
  },
]);
