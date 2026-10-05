/**
 * Guideline spec model: validation and token resolution.
 *
 * Shared by the Storybook doc blocks and `scripts/check-guidelines.ts`, so it must stay free of
 * runtime imports (Node runs it with type stripping). Callers pass the token tree in.
 */

export const STATES = ['enabled', 'hovered', 'focused', 'pressed', 'disabled'] as const;
export type StateId = (typeof STATES)[number];

export const STATE_LABELS: Record<StateId, string> = {
  enabled: 'Enabled',
  hovered: 'Hovered',
  focused: 'Focused',
  pressed: 'Pressed',
  disabled: 'Disabled',
};

/** Which part of the component a colour row applies to. Each part maps to one measurable CSS property. */
export const PARTS = ['text', 'focusRing', 'icon', 'background', 'border'] as const;
export type PartId = (typeof PARTS)[number];

export const PART_LABELS: Record<PartId, string> = {
  text: 'Text',
  focusRing: 'Focus ring',
  icon: 'Icon',
  background: 'Background',
  border: 'Border',
};

export interface SpecRow {
  part: PartId;
  /** Semantic token name, e.g. `cc.sem.colour.primarylink`. Omit when the design has no token yet. */
  token?: string;
  /** Figma UI kit alias, e.g. `Primary/main`. */
  uiKit?: string;
  /** Expected dark-mode value: `cc.ref.palette.cyan.400`, `alpha(cc.ref.palette.grey.00, 0.56)` or a hex. */
  value: string;
  description?: string;
}

export interface SpecVariant {
  id: string;
  label: string;
  default?: boolean;
  /** Props passed to the MUI component to render this variant. */
  props: Record<string, unknown>;
  guidance?: string;
  states: Partial<Record<StateId, SpecRow[]>>;
}

export interface SpecColumn {
  label: string;
  value: unknown;
  default?: boolean;
  note?: string;
}

export interface GuidelineSpec {
  component: string;
  /** MUI theme key the component is styled under, e.g. `MuiLink`. */
  muiComponent: string;
  status: 'draft' | 'in-review' | 'approved';
  source?: string;
  summary?: string;
  config?: Record<string, string>;
  font?: { token: string; description?: string };
  matrix: {
    states: StateId[];
    columns?: { prop: string; label: string; values: SpecColumn[] };
  };
  variants: SpecVariant[];
}

export type TokenTree = Record<string, unknown>;

export interface Rgba {
  r: number;
  g: number;
  b: number;
  a: number;
}

export interface ResolvedValue {
  rgba?: Rgba;
  error?: string;
}

export type TokenStatus =
  | { kind: 'none' }
  | { kind: 'missing'; token: string }
  | { kind: 'match'; token: string; rgba: Rgba }
  | { kind: 'conflict'; token: string; rgba?: Rgba; detail: string };

/* -------------------------------------------------------------------------- */
/*                                 Validation                                 */
/* -------------------------------------------------------------------------- */

const isRecord = (v: unknown): v is Record<string, unknown> =>
  typeof v === 'object' && v !== null && !Array.isArray(v);

/**
 * Structural check of a parsed YAML spec. Returns human-readable errors with a path to the
 * offending field, so a designer editing the YAML can find the problem.
 */
export function validateSpec(raw: unknown): { spec?: GuidelineSpec; errors: string[] } {
  const errors: string[] = [];
  const need = (cond: boolean, msg: string) => {
    if (!cond) errors.push(msg);
  };

  if (!isRecord(raw)) return { errors: ['Spec must be a YAML mapping (key: value pairs).'] };

  need(typeof raw.component === 'string', '`component` is required (e.g. Link).');
  need(typeof raw.muiComponent === 'string', '`muiComponent` is required (e.g. MuiLink).');
  need(
    ['draft', 'in-review', 'approved'].includes(raw.status as string),
    '`status` must be one of: draft, in-review, approved.',
  );

  const matrix = raw.matrix;
  if (!isRecord(matrix) || !Array.isArray(matrix.states)) {
    errors.push('`matrix.states` must list the states to show (e.g. [enabled, hovered, focused]).');
  } else {
    matrix.states.forEach((s, i) =>
      need(
        STATES.includes(s as StateId),
        `matrix.states[${i}]: unknown state "${s}". Use one of: ${STATES.join(', ')}.`,
      ),
    );
    if (matrix.columns !== undefined) {
      const c = matrix.columns;
      need(
        isRecord(c) && typeof c.prop === 'string' && Array.isArray(c.values),
        '`matrix.columns` needs `prop`, `label` and a `values` list.',
      );
      if (isRecord(c) && Array.isArray(c.values)) {
        const defaults = c.values.filter((v) => isRecord(v) && v.default === true).length;
        need(defaults <= 1, '`matrix.columns.values`: mark at most one value as `default: true`.');
      }
    }
  }

  if (!Array.isArray(raw.variants) || raw.variants.length === 0) {
    errors.push('`variants` must list at least one variant.');
  } else {
    raw.variants.forEach((v, vi) => {
      const at = `variants[${vi}]`;
      if (!isRecord(v)) return errors.push(`${at} must be a mapping.`);
      need(typeof v.id === 'string', `${at}.id is required.`);
      need(typeof v.label === 'string', `${at}.label is required.`);
      need(isRecord(v.props), `${at}.props is required (use {} for none).`);
      if (!isRecord(v.states)) return errors.push(`${at}.states is required.`);
      for (const [state, rows] of Object.entries(v.states)) {
        const sat = `${at}.states.${state}`;
        need(
          STATES.includes(state as StateId),
          `${sat}: unknown state. Use one of: ${STATES.join(', ')}.`,
        );
        if (!Array.isArray(rows)) {
          errors.push(`${sat} must be a list of rows.`);
          continue;
        }
        rows.forEach((r, ri) => {
          const rat = `${sat}[${ri}]`;
          if (!isRecord(r)) return errors.push(`${rat} must be a mapping.`);
          need(
            PARTS.includes(r.part as PartId),
            `${rat}.part: "${r.part}" is not one of ${PARTS.join(', ')}.`,
          );
          need(
            typeof r.value === 'string',
            `${rat}.value is required (e.g. cc.ref.palette.cyan.400).`,
          );
          need(r.token === undefined || typeof r.token === 'string', `${rat}.token must be text.`);
        });
      }
    });
  }

  return errors.length ? { errors } : { spec: raw as unknown as GuidelineSpec, errors };
}

/* -------------------------------------------------------------------------- */
/*                              Token resolution                              */
/* -------------------------------------------------------------------------- */

/**
 * Look up a dotted token path. Accepts the shorthand designers use in Figma and Confluence
 * (`cc.ref.palette.cyan400`) as well as the canonical form (`cc.ref.palette.cyan.400`).
 */
export function lookupToken(tokens: TokenTree, path: string): unknown {
  const segments = path.trim().split('.');
  let node: unknown = tokens;
  for (const seg of segments) {
    if (!isRecord(node)) return undefined;
    if (seg in node) {
      node = node[seg];
      continue;
    }
    const split = /^([a-z]+)(\d+)$/i.exec(seg);
    if (split && isRecord(node[split[1]])) {
      node = (node[split[1]] as Record<string, unknown>)[split[2]];
      continue;
    }
    return undefined;
  }
  return node;
}

export function hexToRgba(hex: string): Rgba | undefined {
  const m = /^#([0-9a-f]{6})([0-9a-f]{2})?$/i.exec(hex.trim());
  if (!m) return undefined;
  const n = parseInt(m[1], 16);
  return {
    r: (n >> 16) & 255,
    g: (n >> 8) & 255,
    b: n & 255,
    a: m[2] ? parseInt(m[2], 16) / 255 : 1,
  };
}

/** Parse a CSS `rgb()` / `rgba()` string as returned by `getComputedStyle`. */
export function cssToRgba(css: string): Rgba | undefined {
  const m = /^rgba?\(\s*([\d.]+)[,\s]+([\d.]+)[,\s]+([\d.]+)(?:\s*[,/]\s*([\d.]+))?\s*\)$/i.exec(
    css.trim(),
  );
  if (!m) return hexToRgba(css);
  return { r: +m[1], g: +m[2], b: +m[3], a: m[4] === undefined ? 1 : +m[4] };
}

/** Resolve a spec value expression to a colour. */
export function resolveValue(tokens: TokenTree, expr: string): ResolvedValue {
  const text = expr.trim();
  const alphaMatch = /^alpha\(\s*(.+?)\s*,\s*([\d.]+)\s*\)$/i.exec(text);
  const base = alphaMatch ? alphaMatch[1] : text;
  const alpha = alphaMatch ? Number(alphaMatch[2]) : undefined;

  let rgba: Rgba | undefined;
  if (base.startsWith('#')) {
    rgba = hexToRgba(base);
    if (!rgba) return { error: `"${base}" is not a 6- or 8-digit hex colour.` };
  } else {
    const found = lookupToken(tokens, base);
    if (typeof found !== 'string') return { error: `"${base}" is not a colour in tokens.jsonc.` };
    rgba = hexToRgba(found);
    if (!rgba) return { error: `"${base}" resolves to "${found}", which is not a hex colour.` };
  }

  if (alpha !== undefined) {
    if (alpha < 0 || alpha > 1) return { error: `alpha ${alpha} must be between 0 and 1.` };
    rgba = { ...rgba, a: alpha };
  }
  return { rgba };
}

export function sameColour(a: Rgba, b: Rgba): boolean {
  return (
    Math.abs(a.r - b.r) <= 1 &&
    Math.abs(a.g - b.g) <= 1 &&
    Math.abs(a.b - b.b) <= 1 &&
    Math.abs(a.a - b.a) <= 0.01
  );
}

export function formatRgba({ r, g, b, a }: Rgba): string {
  const hex = `#${[r, g, b]
    .map((n) => Math.round(n).toString(16).padStart(2, '0'))
    .join('')
    .toUpperCase()}`;
  return a >= 0.995 ? hex : `${hex} @ ${Math.round(a * 100)}%`;
}

/** Compare a row's semantic token (if any) with the value the spec expects. */
export function tokenStatus(tokens: TokenTree, row: SpecRow): TokenStatus {
  if (!row.token) return { kind: 'none' };
  const found = lookupToken(tokens, row.token);
  if (found === undefined) return { kind: 'missing', token: row.token };
  if (typeof found !== 'string') {
    return {
      kind: 'conflict',
      token: row.token,
      detail: 'is a group of tokens, not a single colour',
    };
  }
  const tokenRgba = hexToRgba(found);
  const expected = resolveValue(tokens, row.value).rgba;
  if (!tokenRgba)
    return { kind: 'conflict', token: row.token, detail: `is "${found}", not a hex colour` };
  // A token carries the opaque colour; opacity is applied with alpha() at the call site.
  if (expected && !sameColour(tokenRgba, { ...expected, a: 1 })) {
    return {
      kind: 'conflict',
      token: row.token,
      rgba: tokenRgba,
      detail: `is ${formatRgba(tokenRgba)} in tokens.jsonc, but the spec expects ${formatRgba({ ...expected, a: 1 })}`,
    };
  }
  return { kind: 'match', token: row.token, rgba: tokenRgba };
}

/** Every row in the spec, flattened with its variant and state. */
export function allRows(spec: GuidelineSpec) {
  return spec.variants.flatMap((variant) =>
    STATES.flatMap((state) =>
      (variant.states[state] ?? []).map((row) => ({ variant, state, row })),
    ),
  );
}
