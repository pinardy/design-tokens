# Known Issues

An audit of the `design-tokens` package as of commit `1a30170` (`main`). Each entry records the problem, the evidence, and a fix. Fixes marked **Verified** were applied to a scratch working tree and checked with the commands shown; none of them are applied on this branch.

## Summary

| ID                                                                          | Severity | Area      | Problem                                                                                                              | Fix status         |
| --------------------------------------------------------------------------- | -------- | --------- | -------------------------------------------------------------------------------------------------------------------- | ------------------ |
| [DT-01](#dt-01-build-fails-icon-overrides-are-not-imported)                 | Critical | Theme     | `npm run build` / `npm pack` fail: icon overrides used but not imported                                              | Verified           |
| [DT-02](#dt-02-lint-fails-stories-import-the-storybook-renderer-package)    | High     | Storybook | `npm run lint` fails with 18 errors in the stories                                                                   | Verified           |
| [DT-03](#dt-03-published-dist-contains-stories-and-build-scripts)           | Medium   | Packaging | `dist/` ships stories, the token build script and dead code                                                          | Verified           |
| [DT-04](#dt-04-custom-palette-colours-are-typed-but-never-defined)          | Medium   | Types     | `violet` / `danger` are typed as always present but no theme defines them, so `color="violet"` silently does nothing | Proposed           |
| [DT-05](#dt-05-readme-is-out-of-date)                                       | Medium   | Docs      | README describes outputs, file names and a token shape that no longer exist                                          | Proposed           |
| [DT-06](#dt-06-yellow50-is-pink)                                            | Low      | Tokens    | `cc.ref.palette.yellow.50` is `#FFBBE4` (pink)                                                                       | Needs design input |
| [DT-07](#dt-07-buildtokens-output-is-not-prettier-formatted)                | Low      | Tooling   | `build:tokens` output differs from the committed file until Prettier runs                                            | Verified           |
| [DT-08](#dt-08-overrides-mostly-use-raw-palette-tokens-not-semantic-tokens) | Low      | Theme     | 82 raw `cc.ref.palette` references vs 39 `cc.sem` references in overrides                                            | Proposed           |
| [DT-09](#dt-09-several-semantic-tokens-collapse-to-the-same-value)          | Low      | Tokens    | Four semantic tokens all resolve to `grey.00`                                                                        | Needs design input |
| [DT-10](#dt-10-no-automated-checks)                                         | Low      | Tooling   | No tests or CI, so DT-01 and DT-02 reached `main` unnoticed                                                          | Proposed           |

Severity scale: **Critical** blocks building or publishing. **High** breaks a standard developer command. **Medium** affects consumers or makes the docs misleading. **Low** is tidiness or a latent risk.

---

## DT-01: Build fails, icon overrides are not imported

**Severity:** Critical | **Area:** `src/theme/themeOptions.ts` | **Introduced in:** `d46e5fa` (fix: add missing style overrides for icons (#5))

### Problem

Commit `d46e5fa` added `iconStyleOverrides` and `svgIconStyleOverrides` to `styleOverrides.ts` and registered them as `MuiIcon` / `MuiSvgIcon` in both theme objects. It did not add them to the import list at the top of `themeOptions.ts`. Because `prepack` runs `build`, `npm pack` fails too, so the package can't be published.

### Evidence

```text
$ npx tsc --project tsconfig.app.json --noEmit
src/theme/themeOptions.ts(80,14): error TS2552: Cannot find name 'iconStyleOverrides'. Did you mean 'linkStyleOverrides'?
src/theme/themeOptions.ts(81,17): error TS2552: Cannot find name 'svgIconStyleOverrides'. Did you mean 'switchStyleOverrides'?
src/theme/themeOptions.ts(139,14): error TS2552: Cannot find name 'iconStyleOverrides'. Did you mean 'linkStyleOverrides'?
src/theme/themeOptions.ts(140,17): error TS2552: Cannot find name 'svgIconStyleOverrides'. Did you mean 'switchStyleOverrides'?
```

### Fix (Verified)

Add both names to the existing import in `src/theme/themeOptions.ts`:

```diff
   linkStyleOverrides,
   breadcrumbsStyleOverrides,
+  iconStyleOverrides,
+  svgIconStyleOverrides,
 } from './styleOverrides';
```

**Verification:** `npx tsc --project tsconfig.app.json --noEmit` and `npm run build` both exit 0.

**Prevention:** this is the "three edits" rule in `CLAUDE.md` (export the override, then register it in both themes), plus the import. DT-10 would catch it automatically.

---

## DT-02: Lint fails, stories import the Storybook renderer package

**Severity:** High | **Area:** `src/stories/*.stories.tsx`

### Problem

All 18 story files import their types (`Meta`, `StoryObj`) from `@storybook/react`. The `storybook/no-renderer-packages` rule from `eslint-plugin-storybook` rejects this, because the project's framework package is `@storybook/react-vite` (see `.storybook/main.ts`).

### Evidence

```text
$ npx eslint .
src/stories/Tabs.stories.tsx
  2:1  error  Do not import renderer package "@storybook/react" directly. Use a framework package instead (e.g. ... @storybook/react-vite ...)  storybook/no-renderer-packages
...
✖ 18 problems (18 errors, 0 warnings)
```

Affected files: `Breadcrumbs`, `ButtonTokens`, `Checkbox`, `Chip`, `ColourPaletteViewer`, `Dialog`, `Link`, `MenuDropdown`, `Progress`, `RadioButton`, `Select`, `Skeleton`, `Slider`, `Switch`, `Tabs`, `TextField`, `ToggleButton`, `ToolTip` (all `*.stories.tsx`).

### Fix (Verified)

Change the import source in each story. The exported type names are the same, so nothing else changes:

```diff
-import type { Meta, StoryObj } from '@storybook/react';
+import type { Meta, StoryObj } from '@storybook/react-vite';
```

One-liner:

```sh
sed -i "s#from '@storybook/react';#from '@storybook/react-vite';#" src/stories/*.stories.tsx
```

**Verification:** `npx eslint .` exits 0 with no problems, and `tsc` still exits 0.

---

## DT-03: Published `dist/` contains stories and build scripts

**Severity:** Medium | **Area:** `tsconfig.app.json`, `package.json` `files`

### Problem

`tsconfig.app.json` has `"include": ["src"]`, so `npm run build` compiles everything under `src/` into `dist/`, and `"files": ["dist/"]` publishes all of it. The package therefore ships:

- 19 story and story-helper modules (`dist/stories/*`), which import Storybook types and React components consumers don't need.
- `dist/theme/build-tokens.js`, the style-dictionary build script. It runs a build as soon as it's imported, and style-dictionary is only a devDependency.
- `dist/theme/customThemes.js`, which is entirely commented out.

None of these files are reachable through the `exports` map, so this adds size and noise without breaking anything.

### Evidence

After a successful build, `find dist -name '*.js'` lists 28 files. Only 7 of them are library code.

### Fix (Verified)

Exclude the non-library files in `tsconfig.app.json`:

```diff
-  "include": ["src"]
+  "include": ["src"],
+  "exclude": ["src/stories", "src/theme/build-tokens.ts", "src/theme/customThemes.ts"]
```

**Verification:** `npx tsc --project tsconfig.app.json` exits 0, and `dist/` then holds only `index`, `theme/{index,styleOverrides,themeOptions,tokens}`, `types/mui-component-override` and `utils/utils`.

**Follow-up to consider:** with `src/stories` excluded, the stories are no longer typechecked by `npm run build`. If that coverage matters, add a separate `tsconfig.storybook.json` (or a `typecheck` script that runs without the exclude). Separately, delete `customThemes.ts` or restore it, since it's dead code.

---

## DT-04: Custom palette colours are typed but never defined

**Severity:** Medium | **Area:** `src/types/mui-component-override.ts`, `src/theme/themeOptions.ts`

### Problem

The module augmentation declares `violet` and `danger` as **required** members of `Palette` (`violet: PaletteColor`). It also enables `color="violet"` on `Button` and `Chip`. However, neither `lightThemeOptions` nor `darkThemeOptions` sets `palette.violet` or `palette.danger`. Consumer code typechecks but misbehaves at runtime:

- `<Button color="violet">` / `<Chip color="violet">` **fail silently**. They render and get the `MuiButton-colorViolet` class, but MUI applies no colour styles because the palette entry is missing.
- `theme.palette.violet.main` (e.g. in `sx` or `styled`) **throws** `TypeError`, because `palette.violet` is `undefined`. TypeScript doesn't warn, since the type says the entry is always present.

### Evidence

Server-rendering with `@mui/material` 7.3 and a theme that has no `violet` entry:

```text
palette.violet = undefined
Button rendered OK: ... MuiButton-textViolet ... MuiButton-colorViolet ...
Chip rendered OK: ... MuiChip-colorViolet MuiChip-filledViolet ...
```

The integration skill (`.claude/skills/design-tokens-mui/SKILL.md`, step 3) already warns consumers about this gap. However, it says `<Button color="violet">` "breaks at runtime". Per the evidence above, it actually falls back silently to no colour styling. Correct that wording when this issue is fixed.

### Fix (Proposed)

Pick one:

1. **Define the colours in both themes.** This is preferred if the design system means to ship them. The reference palette has no `violet` scale, but it does have `purple`. Add (or alias) a scale in `tokens.jsonc`, then:

   ```ts
   palette: {
     // ...
     violet: { main: cc.ref.palette.purple['400'] }, // confirm step with design
     danger: { main: cc.ref.palette.red['400'] },
   },
   ```

   Use the `300` steps in `darkThemeOptions` to match the existing light/dark convention.

2. **Make the types honest.** If consumers are expected to supply the colours, declare them optional on `Palette` (`violet?: PaletteColor`) so TypeScript forces a check.

---

## DT-05: README is out of date

**Severity:** Medium | **Area:** `README.md`

### Problem

| README says                                                                   | Actual state                                                                                                                  |
| ----------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `build:tokens` generates `tokens.ts`, `tokens.d.ts` and `tokens.css`          | Only `tokens.ts` is generated. The `.d.ts` and CSS platforms are commented out in `a81b070`.                                  |
| "transformed into TypeScript and CSS files"                                   | TypeScript only                                                                                                               |
| Outputs are configured in `style-dictionary.config.json`                      | The file is `src/theme/style-dictionary.config.jsonc`                                                                         |
| Usage example: `const { palette, typography } = tokens; palette.yellow['70']` | Tokens are nested under `cc`: `tokens.cc.ref.palette.yellow['400']`. Steps are `50`–`1000` in hundreds; `'70'` doesn't exist. |
| Example builds a `ThemeOptions` by hand                                       | The package exports ready-made `lightThemeOptions` / `darkThemeOptions` via `design-tokens/themeOptions`                      |
| Flowchart: "tokens.ts / tokens.css generated"                                 | `tokens.ts` only                                                                                                              |
| `npm pack` produces e.g. `design-tokens-1.0.0.tgz`                            | The current version is `0.0.1-ALPHA` (illustrative only, but misleading)                                                      |

There's also a typo: "meant to be be shared".

### Fix (Proposed)

Rewrite the "Developing Design Tokens" and usage sections to match the current pipeline. Replace the hand-built `ThemeOptions` example with the consumer flow from the skill doc (`createTheme(lightThemeOptions)`, plus the `mui-component-override` import), and show `tokens.cc.sem.*` / `tokens.cc.ref.palette.*` access.

---

## DT-06: `yellow.50` is pink

**Severity:** Low | **Area:** `src/theme/tokens.jsonc`

### Problem

```jsonc
"yellow": {
  "50":  { "value": "#FFBBE4" },  // pink: does not fit the scale
  "100": { "value": "#FFFAD6" },
  "200": { "value": "#FFEF9C" },
```

Every other scale's `50` step is a lighter tint of its `100` step (e.g. red `#FFE0E2` → `#FFD5D8`, amber `#FEEEE4` → `#FFECDD`). `#FFBBE4` is a saturated pink and looks like a transcription error. A similar slip was fixed earlier in `9e3c3d4` (fix: colour code for yellow 500).

### Fix (Needs design input)

Ask design for the correct value, update `tokens.jsonc`, and run `npm run build:tokens`. Don't guess a hex value. Nothing in `styleOverrides.ts` currently uses `yellow.50`, so changing it has no effect on the components.

---

## DT-07: `build:tokens` output is not Prettier-formatted

**Severity:** Low | **Area:** `src/theme/build-tokens.ts`

### Problem

The custom format writes the token tree with `JSON.stringify(nested, null, 2)` (double-quoted keys and strings). The committed `tokens.ts` has been run through Prettier (single quotes, unquoted keys). Running `npm run build:tokens` on an unchanged `tokens.jsonc` therefore rewrites the whole file: a 460-line diff with no change to any value. That noise makes real token changes hard to review.

### Evidence

```text
$ npm run build:tokens && git diff --stat src/theme/tokens.ts
 src/theme/tokens.ts | 460 ++++++++++++++++++++++++++--------------------------
$ npx prettier --write src/theme/tokens.ts && git diff --stat src/theme/tokens.ts
(no output: identical to committed file)
```

### Fix (Verified)

Format after generating:

```diff
-"build:tokens": "ts-node src/theme/build-tokens.ts",
+"build:tokens": "ts-node src/theme/build-tokens.ts && prettier --write src/theme/tokens.ts",
```

Alternatively, call Prettier's API inside the format function in `build-tokens.ts`.

---

## DT-08: Overrides mostly use raw palette tokens, not semantic tokens

**Severity:** Low | **Area:** `src/theme/styleOverrides.ts`

### Problem

The project convention (in `CLAUDE.md` and the skill doc) is to prefer `cc.sem.*` semantic tokens. In practice, `styleOverrides.ts` has **82** `cc.ref.palette` references and **39** `cc.sem` references. Only Button, Checkbox, RadioGroup, Radio, Menu and Dialog (backdrop) are fully semantic. TextField, Icon and SvgIcon use no tokens at all.

Raw references per override:

| Override                      | `cc.ref` refs | Override                    | `cc.ref` refs |
| ----------------------------- | ------------- | --------------------------- | ------------- |
| `toggleButtonOverrides`       | 13            | `menuItemStyleOverrides`    | 5             |
| `switchStyleOverrides`        | 12            | `inputLabelStyleOverrides`  | 4             |
| `chipStyleOverrides`          | 9             | `selectStyleOverrides`      | 4             |
| `outlinedInputStyleOverrides` | 9             | `tabStyleOverrides`         | 4             |
| `breadcrumbsStyleOverrides`   | 6             | `formHelperTextOverrides`   | 3             |
| `linkStyleOverrides`          | 3             | `formControlLabelOverrides` | 2             |
| `inputAdornmentOverrides`     | 2             | `sliderOverrides`           | 2             |
| `circularProgressOverrides`   | 1             | `dialogTitleOverrides`      | 1             |
| `skeletonOverrides`           | 1             | `toolTipOverrides`          | 1             |

There's also a related hard-coded case: `circularProgressOverrides` uses `cc.ref.palette.cyan['400']`, which is exactly `cc.sem.colour.action.primary`.

### Fix (Proposed)

Migrate component by component. Where a semantic token with the same meaning exists, use it (e.g. `cyan.400` → `sem.colour.action.primary`, `grey.00` text → `sem.colour.text.tertiary`). Where none exists, agree a new `cc.sem` token with design first. Check each component in Storybook (light and dark) as you migrate it.

---

## DT-09: Several semantic tokens collapse to the same value

**Severity:** Low | **Area:** `src/theme/tokens.jsonc` (`cc.sem.colour`)

### Problem

`action.disabled`, `action.tertiary`, `text.disabled` and `text.tertiary` all alias `{cc.ref.palette.grey.00}`. This may be intentional; disabled states get their contrast from `alpha()` at the call site. But it also means that:

- Swapping one token in a code change has no visual effect, so a wrong-token mistake can't be seen in review or Storybook.
- `grey.00` (`#FDFDFD`) is near-white. As the "disabled"/"tertiary" colour in the **light** theme, it is nearly invisible on the white background. The semantic layer has no light/dark split, so both themes get the same value.

### Fix (Needs design input)

Confirm with design whether these tokens should differ. If the design system is meant to support light mode, consider mode-aware semantic tokens (e.g. `cc.sem.light.*` / `cc.sem.dark.*`, or style-dictionary themes) so overrides can resolve per mode.

---

## DT-10: No automated checks

**Severity:** Low | **Area:** Tooling

### Problem

The repo has no tests and no CI workflow (`.github/` doesn't exist). DT-01 (a type error) and DT-02 (lint errors) both reached `main` and would have been caught by a basic check on every push.

### Fix (Proposed)

Add a minimal GitHub Actions workflow that runs on pull requests and on pushes to `main`:

```yaml
- run: npm ci
- run: npx tsc --project tsconfig.app.json --noEmit
- run: npm run lint
- run: npx prettier --check .
- run: npm run build-storybook
```

Optionally add a drift check (`npm run build:tokens && git diff --exit-code src/theme/tokens.ts`, after DT-07) so `tokens.ts` can't fall out of sync with `tokens.jsonc`.

---

## How these were verified

All verified fixes were applied together to a scratch working tree on top of `1a30170`, with dependencies from `npm ci`:

| Check                                                        | Before                                            | After fixes                      |
| ------------------------------------------------------------ | ------------------------------------------------- | -------------------------------- |
| `npx tsc --project tsconfig.app.json --noEmit`               | 4 errors (DT-01)                                  | exit 0                           |
| `npx eslint .`                                               | 18 errors (DT-02)                                 | exit 0                           |
| `npm run build`                                              | fails (DT-01)                                     | exit 0                           |
| `dist/` `.js` file count                                     | n/a (build failed)                                | 7 (DT-03 applied); 28 without it |
| `npm run build:tokens` + `prettier --write`                  | 460-line diff                                     | no diff (DT-07)                  |
| SSR render of `color="violet"` (DT-04, behaviour check only) | renders unstyled; `palette.violet` is `undefined` | n/a, fix not applied             |

The scratch changes were then reverted. This branch contains only this document.
