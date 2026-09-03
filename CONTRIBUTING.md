# Contributing to the Konkani-English Dictionary

A step-by-step guide for adding or editing entries. No programming experience required.

---

## Two ways to contribute

### Option A: The web editor (easiest)

1. Start the dev server: open a terminal in the project folder and run `npm run dev`
2. Open `http://localhost:5173/editor` in your browser
3. You'll see a list of all existing entries on the left. Click one to edit it, or click **+ New Entry** to start fresh
4. Fill in the fields (see "Fields explained" below)
5. Click **Save** — the file is written straight into the `entries/` folder
6. When done, open a pull request with your changes (or ask someone to help you do that)

### Option B: Text editor (for people comfortable with files)

1. Create a new `.toon` file inside the correct folder under `entries/` (see "Folder structure" below)
2. Copy an existing `.toon` file as a template — pick one that's similar to what you're adding
3. Edit the fields (see "Fields explained" below)
4. Save the file. Run `npm run validate` in the terminal to check your entry for errors
5. Open a pull request with your changes

---

## Folder structure

Every entry lives inside `entries/` in a folder that matches its part of speech:

```
entries/
  nouns/          part_of_speech: nouns
  verbs/          part_of_speech: verbs
  adjectives/     part_of_speech: adjectives
  pro-forms/      part_of_speech: pro-form
  queries/        part_of_speech: queries
  uncountable/    part_of_speech: uncountable
  misc/           part_of_speech: misc
```

**The folder name must match the `part_of_speech` field in the file.** If you put a file in `entries/verbs/`, the `part_of_speech` line must say `verb`. The validator will catch mismatches.

The filename becomes part of the URL. For example `entries/nouns/bail.toon` becomes the page `/entries/nouns-bail`. Use lowercase Konkani for filenames, with hyphens for multi-word names (e.g. `bhaail-munis.toon`).

---

## Parts of speech

Pick one. This determines which folder the file goes in.

| Part of speech | Folder      | What it's for                                                    |
| -------------- | ----------- | ---------------------------------------------------------------- |
| `noun`         | `nouns/`    | People, places, things. Should have at least a plural form.      |
| `verb`         | `verbs/`    | Actions and states. Should have at least a past-tense form.      |
| `adjective`    | `adjectives/` | Descriptions of nouns (big, small, sweet, red).               |
| `pro-form`     | `pro-forms/` | Pronouns and other pro-forms (I, you, he, she, this, that).    |
| `query`        | `queries/`  | Interrogatives (who, what, where, how, when).                    |
| `uncountable`  | `uncountable/` | Abstract or mass nouns that don't pluralize (rain, happiness). |
| `misc`         | `misc/`     | Anything that doesn't fit the others — particles, phrases, negations, auxiliaries. |

If unsure, `misc` is fine. Someone else can move it later.

---

## Fields explained

Here's a complete example entry, annotated:

```
konkani_word: bail
meaning[1|]: wife
part_of_speech: nouns
keywords: []
forms[1|]{label|english|value}:
  plural|wives|bailo
examples[1|]{konkani_sentence|english_sentence|literal}:
  ye muje bail|this is my wife|""
categories[1|]: beginner|family
note: null
```

### `konkani_word` (required)

The headword — the Konkani word in romanized form. This is what readers see as the title.

```
konkani_word: bail
```

### `meaning` (required, at least one)

One or more English translations. Each meaning is a distinct sense of the word, not a synonym list. Use `|` to separate multiple meanings.

```
meaning[2|]: do|make
```

This means the word has two distinct senses: "do" and "make". If a word means "bank" (river bank) and "bank" (financial institution), those are two meanings. If a word means "big" and also "large", those are synonyms — pick one.

### `part_of_speech` (required)

Must be one of: `noun`, `verb`, `adjective`, `pro-form`, `query`, `uncountable`, `misc`.

Must match the folder the file is in.

### `keywords` (optional)

Alternate spellings, related words, or common misspellings that help people find this entry via search. These are only used for searching — they don't appear on the page. Lowercase, separated by `|`.

```
keywords[3|]: kashi|kaxi|kaxo
```

If you have nothing to add, leave it empty: `keywords: []`

### `forms` (optional but encouraged)

Grammatical variants of the headword. Each form has three parts:

| Field     | What it means                                   | Example            |
| --------- | ----------------------------------------------- | ------------------ |
| `label`   | What kind of form this is                       | `plural`           |
| `english` | The English of this form                        | `wives`            |
| `value`   | The Konkani word for this form                  | `bailo`            |

Forms are separated by `|` on each line. The header declares the columns:

```
forms[1|]{label|english|value}:
  plural|wives|bailo
```

**What to put in forms:**

- **Nouns**: plural, possessive, dative ("to ___"), genitive ("of ___")
- **Verbs**: past tense, present tense, imperative, and person forms (first person, second person, etc.)
- **Adjectives**: comparative/superlative if they exist (many Konkani adjectives don't inflect)
- **Pro-forms**: possessive, dative, genitive forms
- **Queries**: genitive, dative forms (whose, to whom, etc.)
- **Uncountable/misc**: usually empty

If a word has no grammatical forms, leave it empty: `forms: []`

### `examples` (optional but encouraged)

Usage sentences showing the word in context. Each example has:

| Field              | What it means                              |
| ------------------ | ------------------------------------------ |
| `konkani_sentence` | A full sentence in Konkani                |
| `english_sentence` | The English translation                   |
| `literal`          | Optional word-for-word gloss              |

```
examples[1|]{konkani_sentence|english_sentence|literal}:
  ye muje bail|this is my wife|""
```

The literal field is optional. If not needed, use `""` or leave blank.

You can also use multi-line YAML-style syntax for longer examples:

```
examples[2|]:
  - konkani_sentence: maka khuxi zata
    english_sentence: I am happy
    literal: happiness is happening to me
  - konkani_sentence: dhuk kari naka, khuxi za
    english_sentence: dont worry be happy
```

### `categories` (optional)

Thematic tags for browsing. An entry can belong to multiple categories, or none. Available categories:

| Category       | For words related to...                                  |
| -------------- | -------------------------------------------------------- |
| `beginner`     | Most common, essential words everyone should learn first |
| `family`       | Family members, family relationships                     |
| `friends`      | Social relationships, people you know                    |
| `meals`        | Food, eating, dining                                     |
| `cooking`      | Preparation of food, kitchen activities                  |
| `animals`      | Pets, wildlife, livestock                                |
| `clothing`     | Clothes, accessories, fabrics                            |
| `household`    | Home, furniture, domestic items                          |
| `buildings`    | Structures, rooms, architecture                          |
| `school`       | Education, classroom, learning                           |
| `work`         | Jobs, professions, workplace                             |
| `times`        | Days, months, seasons, time concepts                     |
| `gathering`    | Events, meetings, celebrations                           |
| `gardening`    | Plants, trees, flowers, agriculture                      |
| `weather`      | Rain, wind, seasons, climate                             |
| `nature`       | Rivers, mountains, landscape, the natural world          |
| `temperature`  | Hot, cold, warm, temperature-related                     |
| `art`          | Colors, music, creative expression                       |
| `religion`     | Church, faith, spiritual practices                       |
| `travel`       | Journey, visiting, tourism                                |
| `transportation` | Vehicles, roads, getting around                        |
| `poetic`       | Abstract or literary words (luck, fate, heart)           |
| `body parts`   | Parts of the human body                                  |
| `health`       | Medicine, sickness, wellness (not body parts)            |
| `abstract`     | Concepts that don't fit neatly elsewhere (hole, space)   |

Format: pipe-separated, inline with the field:

```
categories[2|]: beginner|family
```

Or empty: `categories: []`

### `note` (optional)

Extra context about usage, origin, or regional variation. Displayed on the entry page.

```
note: male
```

Use `null` for no note, or a quoted string for text.

---

## The `.toon` file format

TOON is a simple text format. Key rules:

- **Field name and value** are separated by `: ` (colon + space)
- **Arrays** are indicated by `[count|]` after the field name (e.g. `meaning[2|]: do|make`)
- **Inline values** are separated by `|`
- **Nested objects** use `{column1|column2|...}:` headers, then one indented line per item
- **Empty arrays**: `forms: []`
- **Null values**: `note: null`

Don't worry about memorizing this — copy an existing file and modify it.

---

## After you save

1. **Validate**: Run `npm run validate` in the terminal. It checks that your file is valid TOON, the part of speech matches the folder, and required fields are present
2. **Preview**: With `npm run dev` running, open the site and search for your word to see how it looks
3. **Lint**: Run `npm run lint` to check formatting. Run `npm run format` to auto-fix it

---

## Troubleshooting

| Problem | Fix |
| ------- | --- |
| "unrecognized folder" | Your file is in the wrong directory. Check the folder structure table above. |
| "part_of_speech is X but file lives in Y/" | The `part_of_speech` field doesn't match the folder. Change one or the other. |
| "nouns should have at least one form" | Add a plural form, or move the word to `uncountable/` if it genuinely has no plural. |
| "verbs should include a past-tense form" | Add a form with `label` containing the word "past". |
| Entry not showing up on the site | Make sure `npm run dev` is running and you're visiting the right URL. |

---

## Quick reference: copy-paste template

**New noun:**
```
konkani_word: YOUR_WORD
meaning[1|]: YOUR_ENGLISH
part_of_speech: nouns
keywords: []
forms[1|]{label|english|value}:
  plural|PLURAL_ENGLISH|PLURAL_KONKANI
examples: []
categories[1|]: beginner
note: null
```

**New verb:**
```
konkani_word: YOUR_WORD
meaning[1|]: YOUR_ENGLISH
part_of_speech: verbs
keywords: []
forms[1|]{label|english|value}:
  past tense|PAST_ENGLISH|PAST_KONKANI
examples: []
categories[1|]: beginner
note: null
```

**New adjective:**
```
konkani_word: YOUR_WORD
meaning[1|]: YOUR_ENGLISH
part_of_speech: adjectives
keywords: []
forms: []
examples: []
categories[1|]: beginner
note: null
```
