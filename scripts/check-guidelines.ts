/**
 * Validate every guideline spec (`guidelines/<component>/<component>.spec.yaml`) against the
 * design tokens. Run with `npm run check:guidelines`.
 *
 * Fails on: malformed specs, values that don't resolve, tokens whose value conflicts with the spec.
 * Warns on: tokens the spec names that don't exist yet (fails with --strict).
 *
 * Rendered colours are checked in the browser by the Storybook docs page, not here.
 */
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import { parse } from 'yaml';
import { tokens } from '../src/theme/tokens.ts';
import {
  allRows,
  lookupToken,
  resolveValue,
  STATE_LABELS,
  tokenStatus,
  validateSpec,
  type TokenTree,
} from '../guidelines/_lib/spec.ts';

const strict = process.argv.includes('--strict');
const root = join(import.meta.dirname, '..');
const guidelinesDir = join(root, 'guidelines');
const tree = tokens as unknown as TokenTree;

const findSpecs = (dir: string): string[] =>
  readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) return findSpecs(path);
    return name.endsWith('.spec.yaml') ? [path] : [];
  });

let errorCount = 0;
let warningCount = 0;

for (const file of findSpecs(guidelinesDir)) {
  const name = relative(root, file);
  const errors: string[] = [];
  const warnings: string[] = [];

  let raw: unknown;
  try {
    raw = parse(readFileSync(file, 'utf8'));
  } catch (e) {
    errors.push(`YAML syntax: ${(e as Error).message}`);
  }

  const { spec, errors: schemaErrors } = raw === undefined ? { errors: [] } : validateSpec(raw);
  errors.push(...schemaErrors);

  const missing = new Map<string, string[]>();
  const noteMissing = (token: string, where: string) =>
    missing.set(token, [...(missing.get(token) ?? []), where]);

  if (spec) {
    for (const { variant, state, row } of allRows(spec)) {
      const where = `${variant.label} / ${STATE_LABELS[state]} / ${row.part}`;
      const value = resolveValue(tree, row.value);
      if (value.error) errors.push(`${where}: value ${value.error}`);

      const status = tokenStatus(tree, row);
      if (status.kind === 'missing') noteMissing(status.token, where);
      if (status.kind === 'conflict') errors.push(`${where}: ${status.token} ${status.detail}`);
    }
    if (spec.font && lookupToken(tree, spec.font.token) === undefined) {
      noteMissing(spec.font.token, 'Font');
    }
  }

  for (const [token, uses] of missing) {
    warnings.push(`${token} is not in tokens.jsonc (used by ${uses.length}: ${uses.join('; ')})`);
  }
  if (strict) errors.push(...warnings.splice(0));

  const label = errors.length ? 'FAIL' : warnings.length ? 'WARN' : 'PASS';
  console.log(`\n${label}  ${name}${spec ? ` (${spec.component}, ${spec.status})` : ''}`);
  errors.forEach((e) => console.log(`  ✖ ${e}`));
  warnings.forEach((w) => console.log(`  ⚠ ${w}`));

  errorCount += errors.length;
  warningCount += warnings.length;
}

console.log(`\n${errorCount} error(s), ${warningCount} warning(s)`);
process.exit(errorCount ? 1 : 0);
