<div align='center'>
  <img src="https://jynx.vercel.app/images/logo.png" width="80px" />
</div>

<h1 align="center">Jynx</h1>

<p align="center">
<strong>
Rapidly create and control responsive, theme-focused and type-safe components, directly from your jsx.
</strong>
</p>

<div align="center">

[![CI](https://img.shields.io/github/actions/workflow/status/nathnhughes/jynx/main.yml?branch=main&label=CI&logo=github&logoColor=white)](https://github.com/nathnhughes/jynx/actions/workflows/main.yml)
[![npm version](https://img.shields.io/npm/v/jynx)](https://www.npmjs.com/package/jynx)
[![npm downloads](https://img.shields.io/npm/dw/jynx)](https://www.npmjs.com/package/jynx)
[![bundle size](https://img.shields.io/bundlephobia/minzip/jynx)](https://bundlephobia.com/package/jynx)
[![types included](https://img.shields.io/npm/types/jynx)](https://www.npmjs.com/package/jynx)
[![GitHub Repo stars](https://img.shields.io/github/stars/nathnhughes/jynx)](https://github.com/nathnhughes/jynx)
[![license](https://img.shields.io/github/license/nathnhughes/jynx)](https://github.com/nathnhughes/jynx/blob/main/LICENSE)

</div>

---

`Jynx` is a performant and intuitive utility library for the _'CSS-in-JS era'_, allowing for
responsive, theme-focused, type-safe styled-components to be rapidly created and
controlled directly from your jsx.

Originally built in-house for use at [Silk Studio](https://silkstudio.co) to streamline our own development pipeline, `Jynx` is now available to use in your own projects and comes with support for: 

- rapid component styling through the use of style-props
- using objects and arrays to create mobile-first, responsive designs
- integration with a global theme that's accessed directly from your props
- written in Typescript and fully type-safe

### ✏️ &nbsp;Getting Started

Check out the [introduction](https://jynx.vercel.app/getting-started/introduction) to get up and running or head to [jynx.vercel.app](https://jynx.vercel.app) to view the full documentation.

### 🔗 &nbsp;Quick Links

- [Introduction](https://jynx.vercel.app/getting-started/introduction)
- [Responsive Styles](https://jynx.vercel.app/getting-started/responsive-styles)
- [Themes](https://jynx.vercel.app/getting-started/themes)
- [API Reference](https://jynx.vercel.app/reference/api)
- [Types](https://jynx.vercel.app/reference/types)
- [Advanced Theming](https://jynx.vercel.app/theming/setup)
- [Creating Style Functions](https://jynx.vercel.app/utilities/create-style-function)

### 💅 &nbsp;Usage with styled-components v6

styled-components v6 no longer filters unknown props, so without extra setup every jynx style prop (`m`, `bg`, `alignItems`, ...) is passed through to the DOM and React logs "does not recognize the prop" warnings. Use the `shouldForwardProp` helper exported by jynx to stop this, either per component:

```tsx
import styled from 'styled-components'
import { shouldForwardProp, space, type SpaceProps } from 'jynx'

const Box = styled.div.withConfig({ shouldForwardProp })<SpaceProps>`
  ${space}
`
```

or for your whole app:

```tsx
import { StyleSheetManager } from 'styled-components'
import { shouldForwardProp } from 'jynx'

const App = () => (
  <StyleSheetManager shouldForwardProp={shouldForwardProp}>
    {/* ... */}
  </StyleSheetManager>
)
```

`shouldForwardProp` only removes jynx props and forwards everything else. If you also want to filter your own non-HTML props, combine it with [`@emotion/is-prop-valid`](https://www.npmjs.com/package/@emotion/is-prop-valid):

```tsx
import isPropValid from '@emotion/is-prop-valid'
import { shouldForwardProp } from 'jynx'

const forwardProp = (prop: string, target: unknown) =>
  typeof target === 'string' ? isPropValid(prop) && shouldForwardProp(prop) : shouldForwardProp(prop)

// <StyleSheetManager shouldForwardProp={forwardProp}> or styled.div.withConfig({ shouldForwardProp: forwardProp })
```

Emotion doesn't need this setup: `@emotion/styled` already drops invalid HTML props by default.

### 💻 &nbsp;Development

Releases are managed by [release-please](https://github.com/googleapis/release-please) from [conventional commits](https://www.conventionalcommits.org). Each push to `main` updates an open release PR with the next version and `CHANGELOG.md` entries. Merging that PR tags the release, creates a GitHub Release and publishes to npm with provenance through npm trusted publishing (OIDC), so no npm token is needed.

### 📄 &nbsp;License

`Jynx` is [MIT licensed](./LICENSE), Copyright © 2021-present Nathan Hughes.
