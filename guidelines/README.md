# Design guidelines

Component guidelines that used to live on Confluence. Each component has a folder here, and Storybook turns it into a page under **Guidelines/** (`npm run storybook`, then open Guidelines → Link → Docs).

Link is the first and, for now, only component, as a prototype.

```
guidelines/
  link/
    link.spec.yaml     ← tokens, states and colours (the Confluence tables)
    Link.mdx           ← the page: writing, plus where the generated blocks go
    Link.stories.tsx   ← interactive examples used by the page
    spec.ts            ← loads the YAML (no need to edit)
  _blocks/             ← generated blocks: state grid, colour tables, summary
  _lib/                ← spec format and token checks
```

## What to edit

| To change…                                                      | Edit                                                      |
| --------------------------------------------------------------- | --------------------------------------------------------- |
| A colour, token name, UI kit alias or description in the tables | `link.spec.yaml`                                          |
| Which states or underline options appear in the state grid      | `link.spec.yaml` (`matrix`)                               |
| The writing on the page (usage, do and don't, accessibility)    | `Link.mdx`                                                |
| A token's actual value                                          | `src/theme/tokens.jsonc`, then run `npm run build:tokens` |
| How the component really looks                                  | `src/theme/styleOverrides.ts` (engineering)               |

You don't need to install anything to edit. Open the file on GitHub, click the pencil icon, make the change and choose **Propose changes**. That opens a pull request that engineering reviews.

## The spec file

Values are written the same way as on Confluence. Each row is the expected **dark-mode** colour:

```yaml
- part: text # text, focusRing, icon, background or border
  token: cc.sem.colour.primarylink # semantic token name (leave out if there isn't one)
  uiKit: Primary/main # Figma UI kit alias
  value: cc.ref.palette.cyan.400 # or cyan400, alpha(cc.ref.palette.grey.00, 0.56), #00DCFF
  description: Use for primary links.
```

Rows are grouped under a state: `enabled`, `hovered`, `focused`, `pressed` or `disabled`.

The page checks every row three ways:

| Column                | Meaning                                                                                                                                                       |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Dark value (spec)** | Your value, resolved to a hex colour from `tokens.jsonc`                                                                                                      |
| **Token check**       | `✓ Matches`: the token exists and holds that colour. `Not in tokens.jsonc`: the token needs creating. `✗ Conflict`: the token exists with a different colour. |
| **Rendered**          | The colour the real MUI component draws in that state. `✗ Differs` means the code doesn't match the spec.                                                     |

If the YAML has a mistake (a typo in a state name, a colour that doesn't exist), the page shows the error and where it is instead of the tables.

## Checks

```sh
npm run check:guidelines            # validate every spec against tokens.jsonc
npm run check:guidelines -- --strict  # also fail on tokens that don't exist yet
```

The check fails on broken specs and on tokens whose value conflicts with the spec. Missing tokens are warnings, so a spec can name a token before engineering adds it. The rendered-colour check runs in the browser, on the Storybook page.

## Open questions from the Link migration

The prototype page surfaces these. They need a design decision:

1. **Missing tokens.** `cc.sem.colour.primarylink`, `cc.sem.colour.secondarylink`, `cc.sem.colour.border.focusedlink` and `cc.sem.font.action` don't exist in `tokens.jsonc`. The code uses raw palette colours instead.
2. **Inherit link colour.** The spec says `grey00` (`#FDFDFD`). The component renders `#FFFFFF`, because an inherit link takes the page's text colour and the dark theme doesn't set `text.primary`.
3. **Default underline.** Confluence marks **Always\*** as the default. The theme defaults to underline on **hover**.
4. **Light mode.** Only dark values are specified.
