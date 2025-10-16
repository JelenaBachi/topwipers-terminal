import type { Make, Model, Mod } from '@/entities/vehicle/types';
import type { ProductGroupMap } from './types';
import { PRODUCT_TEMPLATES } from './fixtures';

export async function fetchProductsGrouped(_params: {
  make: Make;
  model: Model;
  mod: Mod;
}): Promise<ProductGroupMap> {
  await new Promise((r) => setTimeout(r, 300 + Math.random() * 400));

  return PRODUCT_TEMPLATES;
}
