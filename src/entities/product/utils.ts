import type { Product, ProductGroupMap } from './types';

export type ProductGroup = {
  id: string;
  label: string;
  items: Product[];
};

export function groupsFromMap(
  data: ProductGroupMap | null | undefined,
  preferredOrder: string[] = [],
): ProductGroup[] {
  if (!data) return [];

  const groups: ProductGroup[] = Object.entries(data).map(([code, group]) => ({
    id: code,
    label: group.name ?? code,
    items: group.items ?? [],
  }));

  if (!preferredOrder.length) return groups;

  const orderMap = new Map(preferredOrder.map((c, i) => [c, i]));

  return groups.sort((a, b) => {
    const ai = orderMap.get(a.id) ?? 999;
    const bi = orderMap.get(b.id) ?? 999;
    return ai - bi || a.label.localeCompare(b.label);
  });
}

/* Utility to hide sections without products in the listing */
export function withoutEmpty(groups: ProductGroup[]): ProductGroup[] {
  return groups.filter((g) => g.items.length > 0);
}

/* Converts the group name text into an ID for an anchor */
export function toAnchorId(label: string): string {
  return label
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-_]/g, '');
}
