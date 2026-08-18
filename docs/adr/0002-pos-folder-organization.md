# POS folder organization with validation

Entries are organized into POS-named directories (`nouns/`, `verbs/`, `adjectives/`, `pro-forms/`, `misc/`). The `part_of_speech` field in each file must match its parent directory, enforced by the validation script. This structure makes the entry tree self-documenting and prevents accidental POS misclassification. The trade-off: the slug encodes the folder name, so moving an entry between POS groups changes its URL.
