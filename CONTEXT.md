# Konkani-English Dictionary

A static bilingual dictionary app for Konkani (romanized) to English, pre-rendered as a SvelteKit site from `.toon` files.

## Language

**Entry**:
A dictionary item — a word or a phrase.
_Avoid_: Word (too narrow — misc contains phrases like "kar nakaa")

**Headword**:
The romanized Konkani form that labels an Entry.
_Avoid_: Lemma, citation form

**Romanized Transcription**:
The Latin-letter writing system defined in SPELLING.md, mapping to Devnagari or Kannada script sounds.
_Avoid_: Transliteration, spelling

**Meaning**:
One distinct English definition within an Entry's `meaning` array. Each element is a separate sense.
_Avoid_: Definition, synonym (implies the list is interchangeable)

**Inflected Form**:
A grammatical variant of the Headword, labeled by grammatical context (e.g., "first person past tense (I arrived)" → "ailo").
_Avoid_: Form (ambiguous — could mean shape, document, etc.)

**Example**:
A usage pair: a Konkani sentence and its English translation.
_Avoid_: Sample, example sentence (redundant)

**Literal Translation**:
An optional word-for-word rendering of the Konkani sentence, positioned between the original and the fluent translation.
_Avoid_: Gloss, morphemic gloss (implies linguistic annotation beyond word-for-word)

**Keyword**:
Search-only metadata — alternate spellings, synonyms, related terms for the Fuse.js index. Has no domain meaning.
_Avoid_: Tag, synonym, alias (all imply domain relevance)

**Category**:
A thematic grouping for browsing (e.g., "cooking", "religion", "body parts"). Predefined set of 27. Entries can belong to multiple Categories.
_Avoid_: Tag, theme (Category is the code term)

**Part of Speech**:
The grammatical class: noun, verb, adjective, pro-form, or misc.
_Avoid_: Word class, POS (accepted abbreviation in code but write in full in docs)

**Misc**:
Part of Speech for particles, phrases, and items that don't fit traditional grammatical classes.
_Avoid_: Other, miscellaneous (too vague)

**TOON**:
The custom text format (`.toon` files) used to store Entries. Pipe-delimited key-value with array and object syntax.
_Avoid_: JSON, YAML, config file

**Slug**:
The URL identifier for an Entry, computed as `entries/{folder}-{filename}` (e.g., `entries/verbs-ye`). Spaces in filenames become underscores.
_Avoid_: Path, URL (Slug is the code term)

**Usage Note**:
Context about when, where, or by whom the Headword is used. May also note word origin.
_Avoid_: Note (ambiguous — could mean editor note, technical note, etc.)
