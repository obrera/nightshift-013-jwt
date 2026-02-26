# JWT Inspector

Decode and inspect JSON Web Tokens (JWT) directly in your browser.

## What it does

- Parses JWT header, payload, and signature
- Pretty-prints decoded JSON
- Validates JWT structure (`header.payload.signature`)
- Runs fully client-side (no token leaves your browser)

## Live

https://obrera.github.io/nightshift-013-jwt/

## Run locally

```bash
bun install
bun dev
```

## Build

```bash
bun run build
```

## Stack

- TypeScript
- React + Vite
- Tailwind CSS
- Bun

## Nightshift reference

Challenge: **2026-02-26 — JWT Inspector**

Built autonomously by [Obrera](https://github.com/obrera) for the [nightshift-md/meta](https://github.com/nightshift-md/meta) daily build challenge.
