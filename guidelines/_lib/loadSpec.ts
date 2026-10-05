import { parse } from 'yaml';
import { tokens } from '../../src/theme/tokens';
import { validateSpec, type GuidelineSpec, type TokenTree } from './spec';

export const tokenTree = tokens as unknown as TokenTree;

export type LoadedSpec =
  | { spec: GuidelineSpec; errors: [] }
  | { spec?: undefined; errors: string[] };

/** Parse a spec imported with Vite's `?raw` suffix. Errors are returned for the page to display. */
export function loadSpec(source: string): LoadedSpec {
  let raw: unknown;
  try {
    raw = parse(source);
  } catch (e) {
    return { errors: [`YAML syntax: ${(e as Error).message}`] };
  }
  const { spec, errors } = validateSpec(raw);
  return spec ? { spec, errors: [] } : { errors };
}
