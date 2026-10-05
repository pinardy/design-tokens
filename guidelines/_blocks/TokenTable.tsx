import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  allRows,
  cssToRgba,
  formatRgba,
  lookupToken,
  PART_LABELS,
  resolveValue,
  sameColour,
  STATE_LABELS,
  STATES,
  tokenStatus,
  type GuidelineSpec,
  type PartId,
  type SpecRow,
  type SpecVariant,
  type StateId,
} from '../_lib/spec';
import { tokenTree, type LoadedSpec } from '../_lib/loadSpec';
import {
  Badge,
  LiveInstance,
  measurePart,
  SpecErrors,
  Surface,
  Swatch,
  ui,
  type LiveProps,
} from './live';

type Measured = Record<string, Partial<Record<PartId, string>>>;
const key = (variant: SpecVariant, state: StateId) => `${variant.id}:${state}`;

/** Props for the column value marked as the spec default (e.g. underline="always"). */
const defaultColumnProps = (spec: GuidelineSpec) => {
  const columns = spec.matrix.columns;
  const value = columns?.values.find((v) => v.default)?.value ?? columns?.values[0]?.value;
  return columns && value !== undefined ? { [columns.prop]: value } : {};
};

/**
 * Hidden instance of the component in one state. Reports the colours each spec'd part actually
 * renders with. Measures a few times because the pseudo-states addon rewrites stylesheets after
 * Emotion injects them.
 */
const Probe: React.FC<
  LiveProps & {
    spec: GuidelineSpec;
    variant: SpecVariant;
    state: StateId;
    parts: PartId[];
    onMeasure: (k: string, values: Partial<Record<PartId, string>>) => void;
  }
> = ({ spec, variant, state, parts, onMeasure, ...live }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const partsKey = parts.join(',');
  useEffect(() => {
    const measure = () => {
      if (!ref.current) return;
      const el = ref.current;
      onMeasure(
        key(variant, state),
        Object.fromEntries(partsKey.split(',').map((p) => [p, measurePart(el, p as PartId)])),
      );
    };
    const timers = [0, 300, 1200].map((ms) => window.setTimeout(measure, ms));
    return () => timers.forEach(clearTimeout);
  }, [variant, state, partsKey, onMeasure]);

  return (
    <LiveInstance
      ref={ref}
      {...live}
      state={state}
      props={{ ...variant.props, ...defaultColumnProps(spec) }}
    />
  );
};

const Mono: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <code
    style={{
      fontFamily: ui.mono,
      fontSize: 12,
      wordBreak: 'break-word',
      background: 'none',
      border: 'none',
      padding: 0,
    }}
  >
    {children}
  </code>
);

const TokenCell: React.FC<{ row: SpecRow }> = ({ row }) => {
  const status = tokenStatus(tokenTree, row);
  switch (status.kind) {
    case 'none':
      return <Badge tone="info">No token</Badge>;
    case 'missing':
      return <Badge tone="warn">Not in tokens.jsonc</Badge>;
    case 'match':
      return <Badge tone="ok">✓ Matches</Badge>;
    case 'conflict':
      return (
        <span title={`${status.token} ${status.detail}`}>
          <Badge tone="bad">✗ Conflict</Badge>
          <div style={{ fontSize: 12, marginTop: 4 }}>{status.detail}</div>
        </span>
      );
  }
};

const RenderedCell: React.FC<{ row: SpecRow; measured?: string }> = ({ row, measured }) => {
  const expected = resolveValue(tokenTree, row.value).rgba;
  if (measured === undefined) return <span style={{ color: '#8A919C' }}>Measuring…</span>;
  if (measured === 'none') return <Badge tone="bad">✗ Not drawn</Badge>;
  const actual = cssToRgba(measured);
  if (!actual || !expected) return <Mono>{measured}</Mono>;
  const ok = sameColour(actual, expected);
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
      <Swatch css={measured} />
      <Mono>{formatRgba(actual)}</Mono>
      <Badge tone={ok ? 'ok' : 'bad'}>{ok ? '✓ Matches' : '✗ Differs'}</Badge>
    </span>
  );
};

const th: React.CSSProperties = {
  textAlign: 'left',
  padding: '8px 10px',
  background: ui.headerBg,
  border: ui.border,
  fontSize: 12,
  fontWeight: 700,
  verticalAlign: 'bottom',
};
const td: React.CSSProperties = {
  padding: '8px 10px',
  border: ui.border,
  fontSize: 13,
  verticalAlign: 'top',
};

/**
 * Colour tables in the Confluence layout (one per variant, grouped by state), generated from the
 * spec. Three checks per row: does the token exist, does it hold the spec'd value, and does the
 * real component render that value?
 */
export const TokenTable: React.FC<LiveProps & { loaded: LoadedSpec }> = ({ loaded, ...live }) => {
  const [measured, setMeasured] = useState<Measured>({});
  const onMeasure = useCallback(
    (k: string, values: Partial<Record<PartId, string>>) =>
      setMeasured((prev) =>
        JSON.stringify(prev[k]) === JSON.stringify(values) ? prev : { ...prev, [k]: values },
      ),
    [],
  );
  if (!loaded.spec) return <SpecErrors errors={loaded.errors} />;
  const { spec } = loaded;

  return (
    <div style={{ fontFamily: ui.font, color: ui.text }}>
      {/* Offscreen probes: one per variant × state that has rows. */}
      <Surface mode="dark" style={{ position: 'absolute', left: -10000, top: 0 }}>
        {spec.variants.flatMap((variant) =>
          STATES.filter((s) => variant.states[s]?.length).map((state) => (
            <Probe
              key={key(variant, state)}
              {...live}
              spec={spec}
              variant={variant}
              state={state}
              parts={(variant.states[state] ?? []).map((r) => r.part)}
              onMeasure={onMeasure}
            />
          )),
        )}
      </Surface>

      {spec.variants.map((variant) => (
        <section key={variant.id} style={{ marginBottom: 28 }}>
          <h3 style={{ fontSize: 18, margin: '20px 0 8px' }}>{variant.label}: Colour</h3>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ borderCollapse: 'collapse', width: '100%', minWidth: 760 }}>
              <thead>
                <tr>
                  <th style={th}>Part</th>
                  <th style={th}>Token name</th>
                  <th style={th}>UI Kit alias</th>
                  <th style={th}>Description</th>
                  <th style={th}>Dark value (spec)</th>
                  <th style={th}>Token check</th>
                  <th style={th}>Rendered</th>
                </tr>
              </thead>
              <tbody>
                {STATES.filter((s) => variant.states[s]?.length).map((state) => (
                  <React.Fragment key={state}>
                    <tr>
                      <td
                        colSpan={7}
                        style={{ ...td, background: ui.stateBg, fontWeight: 700, fontSize: 12 }}
                      >
                        State: {STATE_LABELS[state]}
                      </td>
                    </tr>
                    {(variant.states[state] ?? []).map((row, i) => {
                      const resolved = resolveValue(tokenTree, row.value);
                      return (
                        <tr key={i}>
                          <td style={td}>{PART_LABELS[row.part]}</td>
                          <td style={td}>{row.token ? <Mono>{row.token}</Mono> : '–'}</td>
                          <td style={td}>{row.uiKit ?? '–'}</td>
                          <td style={td}>{row.description ?? ''}</td>
                          <td style={td}>
                            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                              <Swatch
                                css={
                                  resolved.rgba &&
                                  `rgba(${resolved.rgba.r},${resolved.rgba.g},${resolved.rgba.b},${resolved.rgba.a})`
                                }
                              />
                              <span>
                                <Mono>{row.value}</Mono>
                                <div
                                  style={{
                                    fontSize: 12,
                                    color: resolved.error ? ui.bad : '#5C6370',
                                  }}
                                >
                                  {resolved.error ?? (resolved.rgba && formatRgba(resolved.rgba))}
                                </div>
                              </span>
                            </span>
                          </td>
                          <td style={td}>
                            <TokenCell row={row} />
                          </td>
                          <td style={td}>
                            <RenderedCell
                              row={row}
                              measured={measured[key(variant, state)]?.[row.part]}
                            />
                          </td>
                        </tr>
                      );
                    })}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      ))}
    </div>
  );
};

/** Header facts for the page: status, configuration, font, and a summary of token gaps. */
export const SpecSummary: React.FC<{ loaded: LoadedSpec }> = ({ loaded }) => {
  if (!loaded.spec) return <SpecErrors errors={loaded.errors} />;
  const { spec } = loaded;
  const statuses = allRows(spec).map(({ row }) => tokenStatus(tokenTree, row));
  const missing = new Set(statuses.flatMap((s) => (s.kind === 'missing' ? [s.token] : [])));
  if (spec.font && lookupToken(tokenTree, spec.font.token) === undefined)
    missing.add(spec.font.token);
  const conflicts = statuses.filter((s) => s.kind === 'conflict').length;

  return (
    <div style={{ fontFamily: ui.font, color: ui.text }}>
      {spec.summary && (
        <p style={{ fontSize: 16, lineHeight: 1.5, margin: '0 0 8px' }}>{spec.summary}</p>
      )}
      {spec.source && <p style={{ fontSize: 13, color: '#5C6370', margin: 0 }}>{spec.source}</p>}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 24,
          alignItems: 'flex-start',
          margin: '16px 0 20px',
        }}
      >
        <table style={{ borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={th}>Category</th>
              <th style={th}>Configuration</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={td}>Status</td>
              <td style={td}>
                <Badge
                  tone={
                    spec.status === 'approved'
                      ? 'ok'
                      : spec.status === 'in-review'
                        ? 'info'
                        : 'warn'
                  }
                >
                  {spec.status}
                </Badge>
              </td>
            </tr>
            {Object.entries(spec.config ?? {}).map(([k, v]) => (
              <tr key={k}>
                <td style={td}>{k}</td>
                <td style={td}>{v}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {spec.font && (
          <table style={{ borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={th}>Font token</th>
                <th style={th}>Description</th>
                <th style={th}>Token check</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={td}>
                  <Mono>{spec.font.token}</Mono>
                </td>
                <td style={td}>{spec.font.description}</td>
                <td style={td}>
                  {lookupToken(tokenTree, spec.font.token) === undefined ? (
                    <Badge tone="warn">Not in tokens.jsonc</Badge>
                  ) : (
                    <Badge tone="ok">✓ Exists</Badge>
                  )}
                </td>
              </tr>
            </tbody>
          </table>
        )}

        <div style={{ fontSize: 13, lineHeight: 1.6, maxWidth: 320 }}>
          <strong>Token gaps</strong>
          <div>
            {missing.size === 0 && conflicts === 0 ? (
              <Badge tone="ok">✓ Every token exists and matches</Badge>
            ) : (
              <>
                {missing.size > 0 && (
                  <div>
                    <Badge tone="warn">{missing.size} missing</Badge>{' '}
                    {[...missing].map((t) => (
                      <div key={t}>
                        <Mono>{t}</Mono>
                      </div>
                    ))}
                  </div>
                )}
                {conflicts > 0 && <Badge tone="bad">{conflicts} conflicting</Badge>}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
