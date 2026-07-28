# TOON format for entry storage

Entries are stored in a custom pipe-delimited text format (`.toon` files) instead of JSON or YAML. TOON was chosen because it is human-readable and hand-editable without syntax errors — no trailing-comma mistakes, no whitespace-sensitivity gotchas. The trade-off is that standard tooling (linters, diff viewers, schema validators) has no native TOON support, so we bundle a schema validation layer with Zod.
