export const entriesImport
    = import.meta.glob
        ('/entries/**/*.toon', { eager: true, import: 'default' })
const entriesArray = Object.values(entriesImport)
const entriesPath = Object.keys(entriesImport)

export const entries = Object.values(entriesArray).map((entry, index) => {
    //@ts-expect-error thats fine
    entry.keywords = entry.keywords.map((keyword) => keyword.toLowerCase())
    // the first replace removes the .json extension, the second replace changes the path to a more readable format, the third takes out spaces and replaces them with underscores
    //@ts-expect-error again, fine
    entry.path = entriesPath[index]
        .replace('.json', '')
        .replace(" ", "_")

        .replace(/^\/?entries\/(\w+)\/(\w+)$/, '/entries/$1-$2')

    return entry

}) //@ts-expect-error again, fine
    .filter((entry) => entry.status === 'published') as Entry[]

// the type of our entries
type Entry = {
    konkani_word: string;
    meaning: string[];
    part_of_speech: string;
    keywords: string[];
    forms: { label: string; value: string }[];
    examples: { konkani_sentence: string; english_sentence: string }[];
    categories: string[];
    status: string;
    note: string;
    path: string;
};