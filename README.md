# utm-link-generator

A simple website to help generate links with analytics.

The site is generated with [Eleventy](https://www.11ty.dev/). This allows us to move as much complexity as possible to build-time, rather than run-time, resulting in a much simpler final site. For example, at build-time, we can read Google Tables to dynamically pull down new option values.

## How to develop

### Pre-requisites

Node.js 20 or newer.

Run `npm install`.

### How to build the site

```bash
npm run build
```

Then open `dist/index.html` in your browser, such as with `open dist/index.html`.

### Format

```bash
npm run fmt
```

### Check for issues

```bash
npm run lint   # Prettier and ESlint
npm run typecheck   # TypeScript
```

You can try fixing issues from `npm run lint` with `npm run fix`.

### Run tests

```bash
npm run test
```
