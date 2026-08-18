# agents.md

## Project

Konkani-English Dictionary. Static bilingual SvelteKit site. Entries in `.toon` files, pre-rendered to HTML at build.

## Domain

See CONTEXT.md. Key terms:

- **Entry** — one dictionary item (word or phrase)
- **Headword** — romanized Konkani label (`konkani_word`)
- **Meaning** — distinct English sense (array, not synonyms)
- **Inflected Form** — grammatical variant (label + value)
- **Literal Translation** — word-for-word gloss (optional)
- **Keyword** — search metadata only
- **Category** — thematic group (27 predefined)
- **Usage Note** — context/origin info (`note` field)
- **Slug** — URL: `entries/{folder}-{filename}`

## Stack

| Layer       | Choice                                    |
| ----------- | ----------------------------------------- |
| Framework   | SvelteKit 5 (runes mode)                  |
| Adapter     | `@sveltejs/adapter-static`                |
| Data format | `@toon-format/toon` (pipe-delimited text) |
| Validation  | Zod                                       |
| Search      | Fuse.js (client-side)                     |
| Lang        | TypeScript (strict)                       |
| Lint        | ESLint + Prettier                         |

## Key files

```
schema/entry.ts        — Zod: EntrySchema, FormSchema, ExampleSchema
schema/categories.ts   — 25 category names
scripts/validation.ts  — CI: parse + validate .toon files
scripts/toon.ts        — legacy JSON → TOON converter
scripts/fill_swadesh_todo.ts — fill entries_todo_swadesh.md from entries/
src/lib/import.ts      — glob import all .toon, compute slug
src/lib/fuse.ts        — Fuse.js index build
src/lib/cmpnts/Search.svelte — debounced search UI
entries/               — data: organized by POS folder
entries_todo_basic.md  — Basic English (Ogden 850) entry tracker
entries_todo_swadesh.md — Swadesh list entry tracker
phrases_todo.md        — phrase entry tracker
```

## Routes

| Route                | Purpose                            |
| -------------------- | ---------------------------------- |
| `/`                  | Home: search + category list       |
| `/entries/[slug]`    | Entry detail page                  |
| `/categories/[slug]` | Category listing                   |
| `/create`            | Entry authoring tool (client-only) |

## Scripts

```bash
npm run dev      # vite dev server
npm run build    # vite build (static HTML)
npm run validate # parse + validate all .toon files
npm run lint     # prettier + eslint check
npm run check    # svelte-check (typecheck)
npm run format   # prettier write
```

## Conventions

- `part_of_speech` must match parent folder name
- Slug = `entries/{folder}-{filename-without-.toon}`, spaces→underscore
- Keywords lowercased on import
- Delimiter in .toon files: `|`
- Categories array embedded in each entry
- Meaning array = distinct senses, not synonyms

## ADRs

- `docs/adr/0001-toon-format-for-entries.md` — why .toon instead of JSON/YAML
- `docs/adr/0002-pos-folder-organization.md` — why folder matches POS field

## Validation script

Run `npx tsx scripts/validation.ts` with no args to check all files.
Run with file paths (from git diff) to check subset in CI.
