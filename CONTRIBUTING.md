# Contributing

Thanks for helping improve jynx.

## Setup

You need Node 22.12 or newer.

```sh
git clone https://github.com/nathnhughes/jynx.git
cd jynx
npm install
```

## Scripts

| Command                | What it does                                  |
| ---------------------- | --------------------------------------------- |
| `npm test`             | Run the tests with Vitest                     |
| `npm run lint`         | Lint with ESLint                              |
| `npx tsc --noEmit`     | Type-check                                    |
| `npm run format:check` | Check formatting with Prettier                |
| `npm run build`        | Build the package into `dist`                 |
| `npm run check:pkg`    | Check the built package with publint and attw |

A pre-commit hook runs Prettier on staged `.ts`, `.tsx`, `.js` and `.md` files and ESLint on staged `.ts` and `.tsx` files.

## Commits

Use [Conventional Commits](https://www.conventionalcommits.org/), for example `fix: handle undefined theme values` or `docs: fix typo in README`. Common types are `feat`, `fix`, `docs`, `test`, `build`, `ci` and `chore`.

## Pull requests

- Branch from `dev` and open your pull request against `dev`.
- Keep each pull request to one change, and add tests for bug fixes and features.
- Make sure format check, lint, type-check, tests and build pass.

## Releases

Releases are automated by [release-please](https://github.com/googleapis/release-please). It reads the commit messages to pick the next version and update the changelog, so don't edit the version in `package.json` or `CHANGELOG.md` by hand.
