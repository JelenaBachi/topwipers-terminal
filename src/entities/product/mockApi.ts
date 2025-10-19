import { useQuery } from '@tanstack/react-query';
import type { ProductGroupMap, ProductDetail } from './types';
import { PRODUCT_TEMPLATES } from './fixtures';

// Загружает список всех групп товаров
export async function fetchProductList(): Promise<ProductGroupMap> {
  return PRODUCT_TEMPLATES;
}

// Загружает данные конкретного товара
export async function fetchProductById(id: string): Promise<ProductDetail> {
  const res = await fetch(`/data/products/${id}.json`, { cache: 'no-cache' });
  if (!res.ok) throw new Error(`Product ${id} not found`);
  const data = await res.json();
  return data as ProductDetail;
}

/**
 * React Query-хук для загрузки и кеширования списка товаров.
 * Автоматически обрабатывает:
 *  - загрузку (isLoading)
 *  - ошибки (isError)
 *  - кеширование
 */
export function useProductList() {
  return useQuery<ProductGroupMap>({
    queryKey: ['products', 'list'],
    queryFn: fetchProductList,
    staleTime: 15_000,
  });
}

/**
 * React Query-хук для страницы товара.
 * Загружает данные по ID, кеширует их и сам управляет состояниями.
 * enabled: !!productId — чтобы не выполнялся запрос, если id ещё undefined.
 */
export function useProductDetail(productId?: string) {
  return useQuery<ProductDetail>({
    queryKey: ['product', productId],
    queryFn: () => fetchProductById(productId!),
    enabled: !!productId,
    staleTime: 60_000,
    gcTime: 10 * 60_000,
    refetchOnWindowFocus: false,
  });
}
