# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

An npm library package (`design-tokens`) that turns design tokens into a Material UI theme layer. Consumers install it and import via subpath exports defined in `package.json`: `design-tokens/tokens`, `design-tokens/themeOptions`, `design-tokens/styleOverrides`, and `design-tokens/mui-component-override`. There is no app entry point — Storybook is the dev/preview environment.

## Commands

- `npm run storybook` — dev environment on port 6006; stories showcase each themed MUI component
- `npm run build:tokens` — regenerate `src/theme/tokens.ts` from `src/theme/tokens.jsonc` via style-dictionary (runs `ts-node src/theme/build-tokens.ts`)
- `npm run build` — compile to `dist/` (`tsc --project tsconfig.app.json`)
- `npm run lint` / `npm run format` — eslint / prettier
- `npm pack` — build a local `.tgz` for testing in a consuming project (`prepack` runs `build:tokens` + `build` automatically)

There are no tests.

## Token pipeline

`src/theme/tokens.jsonc` is the single source of truth, shared between developers and UX designers. Style-dictionary (configured in `src/theme/style-dictionary.config.jsonc`, custom format registered in `src/theme/build-tokens.ts`) transforms it into `src/theme/tokens.ts` — a generated file; never edit it by hand, edit `tokens.jsonc` and rerun `npm run build:tokens`.

Tokens are two-layered under the `cc` namespace:

- `tokens.cc.ref.palette.*` — raw reference palette (grey/red/amber/cyan/... scales keyed by numeric steps like `'400'`)
- `tokens.cc.sem.*` — semantic tokens (e.g. `cc.sem.colour.action.primary`, `cc.sem.colour.text.disabled`) that reference the palette via `{cc.ref.palette.cyan.400}` aliases in the JSONC

Style overrides should prefer semantic (`cc.sem`) tokens; opacity variants are produced with MUI's `alpha()` rather than separate tokens.

## Theme architecture

- `src/theme/styleOverrides.ts` — one exported `Components['MuiX']` override object per MUI component. This is where all component styling lives.
- `src/theme/themeOptions.ts` — assembles `lightThemeOptions` and `darkThemeOptions` (palette + typography + the full `components` registry). **Adding a new component override requires three edits**: export it from `styleOverrides.ts`, then register it in the `components` map of *both* the light and dark theme objects.
- `src/types/mui-component-override.ts` — TypeScript module augmentation declaring custom palette colors (e.g. `violet`, `danger`) on MUI component props. Consuming projects opt in with `import 'design-tokens/mui-component-override';`.

Because overrides are applied globally through the theme, scope them to the owning component — e.g. the dialog backdrop is styled via `MuiDialog`'s slot rather than a global `MuiBackdrop` override, which previously leaked into Select/Menu/Tooltip (see commit 5791098).

## Storybook conventions

Stories live in `src/stories/*.stories.tsx`. Each story builds its own theme with `createTheme(lightThemeOptions | darkThemeOptions)` driven by a `themeMode` radio control, wrapping its content in a `ThemeProvider`. The global decorator in `.storybook/preview.tsx` applies the dark theme with a black background by default.
