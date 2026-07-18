---
name: design-tokens-mui
description: Integrate the design-tokens package into a React + TypeScript app so MUI components pick up the shared design system's style overrides. Use when installing or wiring up design-tokens, setting up an MUI ThemeProvider with lightThemeOptions/darkThemeOptions, styling with tokens (cc.ref palette or cc.sem semantic colours), extending the theme, or fixing type errors around custom palette colours like violet/danger.
---

# Integrating design-tokens with MUI

The `design-tokens` package ships pre-built MUI `ThemeOptions` (light and dark), per-component style overrides, the raw token tree, and TypeScript module augmentation for custom palette colours. Applying its theme restyles MUI components globally — consuming apps should not hand-style individual components to match the design system.

## 1. Install

The package requires MUI and Emotion in the consuming app:

```sh
npm i @mui/material @emotion/react @emotion/styled
```

Then install `design-tokens` itself:

- **From a package registry** (if published): `npm i design-tokens`
- **From a local tarball** (for testing): in the design-tokens repo run `npm pack` (its `prepack` hook regenerates tokens and compiles automatically), then in the consuming app: `npm i ../path/to/design-tokens-<version>.tgz`

Available subpath exports:

| Import | Contents |
|---|---|
| `design-tokens/themeOptions` | `lightThemeOptions`, `darkThemeOptions` (complete `ThemeOptions`) |
| `design-tokens/tokens` | `tokens` object (raw palette + semantic tokens) |
| `design-tokens/styleOverrides` | Individual per-component override objects (`buttonStyleOverrides`, etc.) |
| `design-tokens/mui-component-override` | Type-only module augmentation (see step 3) |

## 2. Apply the theme

Wrap the app once, near the root. Use `CssBaseline` so background/text colours from the theme apply:

```tsx
import { ThemeProvider, CssBaseline } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { lightThemeOptions, darkThemeOptions } from 'design-tokens/themeOptions';

const theme = createTheme(lightThemeOptions); // or darkThemeOptions

export const App = () => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    {/* app content */}
  </ThemeProvider>
);
```

For a light/dark toggle, memoize the theme on the mode:

```tsx
const theme = useMemo(
  () => createTheme(mode === 'light' ? lightThemeOptions : darkThemeOptions),
  [mode],
);
```

Every MUI component with a registered override (Button, Checkbox, Radio, Switch, TextField/OutlinedInput/InputLabel/FormHelperText/InputAdornment, Select, Menu/MenuItem, Tabs, Tooltip, Chip, Skeleton, Slider, Dialog, CircularProgress, Icon/SvgIcon, ToggleButton, Link, Breadcrumbs) is now styled by the design system with no per-component work.

## 3. Enable the type augmentation

Create a `.d.ts` file included by the app's tsconfig (e.g. `src/mui-override.d.ts`):

```ts
import 'design-tokens/mui-component-override';
```

This augments MUI's types with custom palette colours (`violet`, `danger`) on `Palette`/`PaletteOptions` and enables `color="violet"` on `Button` and `Chip`.

**Important:** the augmentation is types-only. The shipped `lightThemeOptions`/`darkThemeOptions` do NOT define `violet` or `danger` palette values, so `<Button color="violet">` compiles but breaks at runtime unless the app adds those palette entries when extending the theme (step 5).

## 4. Use tokens directly

For one-off styling (custom components, `sx` props), pull values from the token tree instead of hard-coding hex values:

```ts
import { tokens } from 'design-tokens/tokens';

const { cc } = tokens;

cc.sem.colour.action.primary   // semantic tokens — prefer these
cc.sem.colour.text.disabled
cc.ref.palette.cyan['400']     // raw reference palette (grey, red, amber, yellow, green, cyan, blue, white, black)
```

Prefer `cc.sem.*` semantic tokens over raw `cc.ref.palette.*` steps. For opacity variants, use MUI's `alpha()` helper rather than inventing new colours:

```ts
import { alpha } from '@mui/material/styles';
alpha(cc.sem.colour.text.disabled, 0.38)
```

## 5. Extend the theme without losing the design system

To add app-specific options (including the `violet`/`danger` palettes), spread on top of the shipped options — deep-merge the `components` map rather than replacing it:

```tsx
import { createTheme } from '@mui/material/styles';
import { lightThemeOptions } from 'design-tokens/themeOptions';
import { tokens } from 'design-tokens/tokens';

const theme = createTheme({
  ...lightThemeOptions,
  palette: {
    ...lightThemeOptions.palette,
    violet: { main: '#7F56D9' }, // required before using color="violet"
  },
  components: {
    ...lightThemeOptions.components,
    MuiCard: { styleOverrides: { root: { borderRadius: 8 } } },
  },
});
```

Individual overrides can also be composed piecemeal from `design-tokens/styleOverrides` if the app only wants some components themed.

## Gotchas

- A plain object spread of `ThemeOptions` is shallow — always re-spread `palette` and `components` as shown above, or an entire section of the design system silently disappears.
- Overrides apply globally through the theme. When adding app-level overrides, scope them to the owning component (e.g. style a dialog backdrop via `MuiDialog`'s slots, not a global `MuiBackdrop` override, which leaks into Select/Menu/Tooltip).
- The dark theme forces `background.default` and `background.paper` to black; check contrast when layering custom surfaces on it.
- Never copy hex values out of the package into app code — import `tokens` so upgrades of the package propagate.
