import React, { useMemo } from 'react';
import { ThemeProvider, createTheme, type Theme } from '@mui/material/styles';
import { lightThemeOptions, darkThemeOptions } from '../../src/theme/themeOptions';
import type { PartId, StateId } from '../_lib/spec';

export type Mode = 'light' | 'dark';

/**
 * Wrapper classes from storybook-addon-pseudo-states. They force `:hover`, `:focus-visible` and
 * `:active` styles on every descendant, so a state can be shown without user interaction.
 */
const STATE_CLASS: Partial<Record<StateId, string>> = {
  hovered: 'pseudo-hover-all',
  focused: 'pseudo-focus-visible-all',
  pressed: 'pseudo-active-all',
};

/** Props a state needs on the component itself (states MUI drives with props, not CSS). */
const STATE_PROPS: Partial<Record<StateId, Record<string, unknown>>> = {
  disabled: { disabled: true },
};

export const useModeTheme = (mode: Mode): Theme =>
  useMemo(() => createTheme(mode === 'light' ? lightThemeOptions : darkThemeOptions), [mode]);

/** Themed surface that mimics an app page with CssBaseline (background + body text colour). */
export const Surface: React.FC<{
  mode: Mode;
  style?: React.CSSProperties;
  children: React.ReactNode;
}> = ({ mode, style, children }) => {
  const theme = useModeTheme(mode);
  return (
    <ThemeProvider theme={theme}>
      <div
        style={{
          background: theme.palette.background.default,
          color: theme.palette.text.primary,
          fontFamily: theme.typography.fontFamily,
          ...style,
        }}
      >
        {children}
      </div>
    </ThemeProvider>
  );
};

export interface LiveProps {
  component: React.ElementType;
  /** Props shared by every instance, e.g. `{ href: '#', children: 'Link' }`. */
  baseProps?: Record<string, unknown>;
}

/** One instance of the real component, forced into a state. */
export const LiveInstance = React.forwardRef<
  HTMLSpanElement,
  LiveProps & { state: StateId; props: Record<string, unknown> }
>(({ component: Component, baseProps, state, props }, ref) => (
  <span ref={ref} className={STATE_CLASS[state]} style={{ display: 'inline-flex' }}>
    <Component {...baseProps} {...props} {...STATE_PROPS[state]} />
  </span>
));
LiveInstance.displayName = 'LiveInstance';

/** Read the CSS colour a part renders with. Returns 'none' when the part isn't drawn at all. */
export function measurePart(wrapper: HTMLElement, part: PartId): string | undefined {
  const el = wrapper.firstElementChild as HTMLElement | null;
  if (!el) return undefined;
  const style = getComputedStyle(el);
  switch (part) {
    case 'text':
      return style.color;
    case 'focusRing':
      return style.outlineStyle === 'none' || style.outlineWidth === '0px'
        ? 'none'
        : style.outlineColor;
    case 'background':
      return style.backgroundColor;
    case 'border':
      return style.borderTopStyle === 'none' ? 'none' : style.borderTopColor;
    case 'icon': {
      const svg = el.querySelector('svg');
      return svg ? getComputedStyle(svg).color : 'none';
    }
  }
}

/* ------------------------------ Shared styles ------------------------------ */

export const ui = {
  /** Explicit text colour: the dark CssBaseline from the global decorator sets body text to white. */
  text: '#2E3438',
  font: '"Nunito Sans", -apple-system, "Segoe UI", Helvetica, Arial, sans-serif',
  mono: 'ui-monospace, Menlo, Monaco, "Courier New", monospace',
  border: '1px solid #D9DDE3',
  headerBg: '#F4F5F7',
  stateBg: '#DEEBFF',
  ok: '#1B7F3B',
  warn: '#A15C00',
  bad: '#C62828',
};

export const Badge: React.FC<{
  tone: 'ok' | 'warn' | 'bad' | 'info';
  children: React.ReactNode;
}> = ({ tone, children }) => {
  const colours = {
    ok: ['#E3F4E8', ui.ok],
    warn: ['#FFF1DB', ui.warn],
    bad: ['#FDE7E7', ui.bad],
    info: ['#E8EEF9', '#2C4A7A'],
  }[tone];
  return (
    <span
      style={{
        display: 'inline-block',
        padding: '1px 8px',
        borderRadius: 10,
        fontSize: 12,
        fontWeight: 600,
        background: colours[0],
        color: colours[1],
        whiteSpace: 'nowrap',
      }}
    >
      {children}
    </span>
  );
};

/** A colour chip drawn on the dark surface the spec values are meant for. */
export const Swatch: React.FC<{ css?: string }> = ({ css }) => (
  <span
    aria-hidden
    style={{
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: 22,
      height: 22,
      borderRadius: 4,
      background: '#121212',
      border: ui.border,
      flexShrink: 0,
    }}
  >
    <span style={{ width: 12, height: 12, borderRadius: 2, background: css ?? 'transparent' }} />
  </span>
);

export const Callout: React.FC<{
  tone: 'warn' | 'bad' | 'info';
  title: string;
  children?: React.ReactNode;
}> = ({ tone, title, children }) => (
  <div
    style={{
      fontFamily: ui.font,
      fontSize: 14,
      border: `1px solid ${tone === 'bad' ? ui.bad : tone === 'warn' ? ui.warn : '#2C4A7A'}`,
      borderLeftWidth: 4,
      borderRadius: 4,
      padding: '10px 14px',
      margin: '16px 0',
      background: '#fff',
      color: ui.text,
    }}
  >
    <strong>{title}</strong>
    {children && <div style={{ marginTop: 4 }}>{children}</div>}
  </div>
);

export const SpecErrors: React.FC<{ errors: string[] }> = ({ errors }) => (
  <Callout tone="bad" title="This spec file has errors, so the page can't be generated">
    <ul style={{ margin: '6px 0 0', paddingLeft: 20 }}>
      {errors.map((e) => (
        <li key={e}>{e}</li>
      ))}
    </ul>
  </Callout>
);
