export const categories = [
    "beginner", // anything crucial to know at the start, most common words, etc.
    "family",
    "friends",
    "meals",
    "cooking",
    "animals",
    "clothing",
    "household",
    "buildings",
    "school",
    "work",
    "times", // days, months, seasons, etc.
    "gathering", // 
    "gardening", // anything related to plants, trees, flowers, etc.
    "weather", // anything related to weather, seasons, climate, etc.
    "nature", // all of gardening and weather, plus anything else related to the natural world, like rivers, mountains, etc.
    "temperature",
    "art", // includes colors, music
    "religion", // church
    "travel",
    "transportation",
    "poetic", // abstract words that are not concrete and are used in a poetic context (i.e. luck, fate, wish etc.), or may have a poetic meaning in addition to a literal meaning (i.e. heart, )
    "body parts",
    "health", // dont inlcude body parts
    "abstract", // words that represent an abstraction (i.e. hole, space, time, power) that don't fit into other categories neatly
    "pro-form", // non pronoun pro forms
    "query", // who, what where ...
    // keep adding more as needed

] as const;
export type Category = (typeof categories)[number];