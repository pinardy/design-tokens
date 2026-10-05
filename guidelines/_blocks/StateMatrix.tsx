import React from 'react';
import { STATE_LABELS, type GuidelineSpec } from '../_lib/spec';
import type { LoadedSpec } from '../_lib/loadSpec';
import {
  Badge,
  Callout,
  LiveInstance,
  SpecErrors,
  Surface,
  ui,
  useModeTheme,
  type LiveProps,
  type Mode,
} from './live';

const GRID_LINE = '1px dashed rgba(156, 39, 176, 0.6)';

/** The theme's own default for the matrix column prop (e.g. MuiLink defaultProps.underline). */
function useThemeDefault(spec: GuidelineSpec | undefined, mode: Mode): unknown {
  const theme = useModeTheme(mode);
  const prop = spec?.matrix.columns?.prop;
  const components = theme.components as
    | Record<string, { defaultProps?: Record<string, unknown> }>
    | undefined;
  return prop && spec ? components?.[spec.muiComponent]?.defaultProps?.[prop] : undefined;
}

/**
 * Variants × states × column values, rendered with the real themed component. This replaces the
 * Figma screenshot on the Confluence page, so it can't fall out of date with the code.
 */
export const StateMatrix: React.FC<
  LiveProps & {
    loaded: LoadedSpec;
    mode?: Mode;
    /** Show spec-vs-theme default checks. */ showChecks?: boolean;
  }
> = ({ loaded, mode = 'dark', showChecks = true, ...live }) => {
  const themeDefault = useThemeDefault(loaded.spec, mode);
  if (!loaded.spec) return <SpecErrors errors={loaded.errors} />;

  const { spec } = loaded;
  const columns = spec.matrix.columns?.values ?? [{ label: 'Default', value: undefined }];
  const prop = spec.matrix.columns?.prop;
  const specDefault = columns.find((c) => c.default);
  const gridTemplateColumns = `110px 110px repeat(${columns.length}, minmax(96px, 1fr))`;

  const cell: React.CSSProperties = {
    minHeight: 64,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRight: GRID_LINE,
    borderBottom: GRID_LINE,
  };
  const label: React.CSSProperties = {
    ...cell,
    justifyContent: 'flex-start',
    paddingLeft: 12,
    border: 'none',
    fontSize: 13,
    color: '#B48CE0',
  };

  return (
    <div>
      <Surface mode={mode} style={{ padding: 20, borderRadius: 8, overflowX: 'auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns, minWidth: 480 }}>
          <div />
          <div />
          {columns.map((c) => (
            <div
              key={c.label}
              style={{
                ...label,
                justifyContent: 'center',
                paddingLeft: 0,
                flexDirection: 'column',
                gap: 4,
              }}
            >
              <span>
                {c.label}
                {c.default && ' *'}
              </span>
              {prop && c.value === themeDefault && (
                <span style={{ fontSize: 11, opacity: 0.8 }}>theme default</span>
              )}
            </div>
          ))}

          {spec.variants.map((variant) =>
            spec.matrix.states.map((state, si) => (
              <React.Fragment key={`${variant.id}-${state}`}>
                <div style={{ ...label, borderTop: si === 0 ? GRID_LINE : 'none' }}>
                  {si === 0 && `${variant.label}${variant.default ? ' *' : ''}`}
                </div>
                <div style={{ ...label, borderTop: si === 0 ? GRID_LINE : 'none' }}>
                  {STATE_LABELS[state]}
                </div>
                {columns.map((c, ci) => (
                  <div
                    key={c.label}
                    style={{
                      ...cell,
                      borderTop: si === 0 ? GRID_LINE : 'none',
                      borderLeft: ci === 0 ? GRID_LINE : 'none',
                    }}
                  >
                    <LiveInstance
                      {...live}
                      state={state}
                      props={{ ...variant.props, ...(prop ? { [prop]: c.value } : {}) }}
                    />
                  </div>
                ))}
              </React.Fragment>
            )),
          )}
        </div>
      </Surface>
      <p style={{ fontFamily: ui.font, fontSize: 13, color: '#5C6370', margin: '8px 0 0' }}>
        <Badge tone="info">Live</Badge> Rendered with the real <code>{spec.muiComponent}</code>{' '}
        theme override in {mode} mode. Hover and focus are forced with
        storybook-addon-pseudo-states. * marks the spec default.
      </p>
      {showChecks &&
        prop &&
        specDefault &&
        themeDefault !== undefined &&
        specDefault.value !== themeDefault && (
          <Callout
            tone="warn"
            title={`Default ${spec.matrix.columns?.label.toLowerCase()} differs between spec and theme`}
          >
            The spec marks <strong>{specDefault.label}</strong> as the default, but the theme sets{' '}
            <code>
              {spec.muiComponent}.defaultProps.{prop} = &quot;{String(themeDefault)}&quot;
            </code>
            . {specDefault.note ?? 'Design to confirm which is right.'}
          </Callout>
        )}
    </div>
  );
};
