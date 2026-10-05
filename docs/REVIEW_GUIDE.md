# Review guide: Link guideline prototype and Storybook previews

The branch `claude/review-combined` is `main` plus two pieces of work, merged so they can be reviewed and run together:

| Branch                             | What it adds                                                                                                                                                            |
| ---------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `claude/link-guidelines-prototype` | The fixes for DT-01 (missing icon imports) and DT-02 (Storybook lint), plus the **Link design guideline in Storybook**, generated from `guidelines/link/link.spec.yaml` |
| `claude/storybook-pr-previews`     | **GitHub Pages deploys**: Storybook from `main` at the site root, and a preview of every pull request                                                                   |

This guide covers setting up the repo, reviewing the changes, and demonstrating the previews and the Pages site.

## 1. Prerequisites

- **Git**
- **Node.js 22.18 or later** (or Node 24). Check with `node -v`. With nvm: `nvm install 22 && nvm use 22`. Vite needs at least 22.12, and the guidelines checker needs 22.18 to run TypeScript directly.
- **Optional:** [actionlint](https://github.com/rhysd/actionlint) (`brew install actionlint`) to lint the workflow files, and the [GitHub CLI](https://cli.github.com/) (`gh`) for the sandbox demo in section 6.

## 2. Get the code

**From scratch:**

```sh
git clone https://github.com/pinardy/design-tokens.git
cd design-tokens
git switch claude/review-combined
npm ci
```

**With an existing clone:**

```sh
cd design-tokens
git fetch origin
git switch claude/review-combined
npm ci
```

`git switch` creates the local branch from `origin` automatically. Run `npm ci` again whenever you switch branches, because this branch adds dependencies that `main` doesn't have.

## 3. Read the changes

**On GitHub (no pull request needed):**

- All changes together: https://github.com/pinardy/design-tokens/compare/main...claude/review-combined
- Link prototype only: https://github.com/pinardy/design-tokens/compare/main...claude/link-guidelines-prototype
- Previews only: https://github.com/pinardy/design-tokens/compare/main...claude/storybook-pr-previews

**In the terminal:**

```sh
git log --oneline origin/main..HEAD           # the commits on this branch
git diff origin/main...HEAD --stat            # every changed file
git diff origin/main...HEAD -- guidelines     # one area at a time:
git diff origin/main...HEAD -- .github        #   guidelines, scripts, .github, src, .storybook
```

In VS Code, GitLens's **Compare References** (`main` ↔ `claude/review-combined`) shows the same diff side by side.

| Commit                                   | What to look at                                                                                         |
| ---------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| `fix: import icon overrides…`            | `src/theme/themeOptions.ts` (DT-01), plus the story imports (DT-02)                                     |
| `feat: prototype Link design guideline…` | `guidelines/` (spec, blocks, page), `scripts/check-guidelines.ts`, `.storybook/main.ts`, `package.json` |
| `ci: deploy Storybook to GitHub Pages…`  | `.github/workflows/`, plus the README section                                                           |

## 4. Run it

```sh
npm run storybook
```

Then open the Link guideline page at http://localhost:6006/?path=/docs/guidelines-link--docs.

The existing stories under **Overall/** load again with the DT-01 fix. On `main`, they crash when the theme loads.

## 5. Run the checks

```sh
npm run typecheck          # library + guidelines + scripts
npm run lint
npm run check:guidelines   # expect: 0 errors, 4 warnings (the missing Link tokens)
npm run build              # library build; guidelines aren't included in dist/
actionlint                 # optional: lints .github/workflows/*.yml
```

## 6. Demonstrate the PR previews and the GitHub Pages site

The two workflows only run on GitHub:

| Workflow                | Runs on                                                | Publishes to                                                      |
| ----------------------- | ------------------------------------------------------ | ----------------------------------------------------------------- |
| `storybook-preview.yml` | Pull requests from branches in this repo               | `https://pinardy.github.io/design-tokens/pr-preview/pr-<number>/` |
| `storybook.yml`         | Pushes to `main` (or a manual run once it's on `main`) | `https://pinardy.github.io/design-tokens/`                        |

A pull request runs the workflow files on its own branch, so previews work **before** anything is merged. The main site only appears once the workflow is on `main`.

There are two ways to demo this.

### Option A: a draft pull request on this repo

This shows the real flow your design lead would use, and nothing is merged.

1. **Open a draft pull request** from `claude/review-combined` into `main`. On GitHub, use **Compare & pull request**, then **Create draft pull request**.
2. **Watch it build.** The **Actions** tab shows **Storybook preview** running: _build_, then _deploy_ (about 2–3 minutes). The first deploy creates the `gh-pages` branch.
3. **Turn on Pages (once).** Go to **Settings → Pages → Build and deployment**. Set **Source** to **Deploy from a branch**, branch **`gh-pages`**, folder **`/ (root)`**, and save. Pages takes a minute or two to publish.
4. **Open the preview.** The PR now has a comment from github-actions with the preview link. Add `?path=/docs/guidelines-link--docs` to go straight to the Link page. The comment can appear before Pages finishes publishing; if the link 404s, wait a minute and reload.
5. **Show the design-edit loop.** On GitHub, switch to the `claude/review-combined` branch and open `guidelines/link/link.spec.yaml`. Click the pencil icon, make one of these edits, and **commit directly to the branch**:
   - **Make a check go green:** change both Inherit `value: cc.ref.palette.grey.00` lines to `value: '#FFFFFF'` (keep the quotes; `#` starts a comment in YAML). In the Colour table, the Inherit **Rendered** column changes from `✗ Differs` to `✓ Matches`.
   - **Clear a warning:** move `default: true` from the `Always` underline column to `On hover`. The "Default underline differs between spec and theme" callout disappears.

   The push re-runs the workflow, and the same preview URL updates in a few minutes. Revert the edit afterwards if it shouldn't stay.

6. **Show the cleanup.** Close the PR without merging. The **Storybook preview** workflow runs a _remove_ job, and the preview URL stops working a minute or two later.

To show the **main site** on this repo, the PR (or a version of it) has to be merged. The first push to `main` then publishes https://pinardy.github.io/design-tokens/. It's the same Storybook build as the preview, published at the root.

### Option B: a sandbox repo (the whole flow, nothing touches this repo)

Use this to demo both the main site and previews before anything is merged here.

```sh
# From your clone, on claude/review-combined
gh repo create design-tokens-demo --public          # Pages is free for public repos
git push https://github.com/<you>/design-tokens-demo.git claude/review-combined:main
```

1. The push to `main` runs **Storybook** in the demo repo's **Actions** tab and creates `gh-pages`.
2. In the demo repo, set **Settings → Pages** to `gh-pages` / `/ (root)`. The main site appears at `https://<you>.github.io/design-tokens-demo/`.
3. Create a branch in the demo repo, edit `guidelines/link/link.spec.yaml` as in step 5 above, and open a pull request. The preview appears at `https://<you>.github.io/design-tokens-demo/pr-preview/pr-1/`, linked from a PR comment.
4. Delete the demo repo when you're done: `gh repo delete <you>/design-tokens-demo`.

### Troubleshooting

| Symptom                                      | Cause                                                                                                                                                     |
| -------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Preview link 404s                            | Pages isn't turned on yet (step 3), or Pages is still publishing. Check **Settings → Pages** for the latest deployment.                                   |
| No workflow runs on the PR                   | Actions are disabled for the repo (**Settings → Actions → General**), or the PR comes from a fork, which is skipped on purpose.                           |
| The deploy job fails with a permission error | An organisation policy limits workflow tokens to read-only. The workflows request `contents: write` and `pull-requests: write`, which that policy blocks. |
| Main site shows an old version               | `storybook.yml` only runs on pushes to `main`. Run it manually from **Actions → Storybook → Run workflow**.                                               |

## 7. Keep up to date and clean up

- If the branch gets more commits: `git pull`.
- `claude/review-combined` is a snapshot of the two source branches. If either one changes, the combined branch needs merging again.
- When you're done:

  ```sh
  git switch main && git branch -D claude/review-combined
  git push origin --delete claude/review-combined   # removes it from GitHub too
  ```

- To undo the Pages demo on this repo, set **Settings → Pages → Source** to **None** and delete the `gh-pages` branch.
