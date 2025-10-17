import type { Make, Model, Mod } from './types';

const MIN = 1;
const MAX = 4;

const count = () => Math.floor(Math.random() * (MAX - MIN + 1)) + MIN;

export async function fetchModels(make: Make): Promise<Model[]> {
  const n = count();
  return Array.from({ length: n }, (_, i) => ({
    code: `${make.code}-m${i + 1}`,
    name: `${make.name} - model${i + 1}`,
  }));
}

export async function fetchMods(make: Make, model: Model): Promise<Mod[]> {
  const n = count();
  const match = /-m(\d+)$/.exec(model.code);
  const mNum = match ? match[1] : '1';

  return Array.from({ length: n }, (_, i) => ({
    code: `${model.code}-md${i + 1}`,
    name: `${make.name} - mod${mNum}.${i + 1}`,
  }));
}
