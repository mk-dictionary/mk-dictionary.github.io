export const entriesImport
    = import.meta.glob
        ('/entries/**/*.toon', { eager: true, import: 'default' })
const entriesArray = Object.values(entriesImport)
const entriesPath = Object.keys(entriesImport)

export const entries = Object.values(entriesArray).map((entry, index) => {
    //@ts-expect-error thats fine
    entry.keywords = [entry.konkani_word, ...entry.meaning, ...entry.keywords.map((keyword) => keyword.toLowerCase())]
    // the first replace removes the .toon extension, the second replace changes the spaces in the path, the third takes out / and replaces it with a dash, so that the path can be used as a slug in the url
    //@ts-expect-error again, fine
    entry.path = entriesPath[index]
        .replace('.toon', '')
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