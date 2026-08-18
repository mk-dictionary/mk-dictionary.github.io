import { z } from 'zod';
import { categories } from './categories';
// todo: fill more categories, and maybe move this to a separate file.
// Also note that "template" should not be a category, only for template.json for now
export const FormSchema = z.object({
	label: z.string(),
	english: z.string(),
	value: z.string(),
	note: z.string().optional()
});

export const ExampleSchema = z.object({
	konkani_sentence: z.string(),
	english_sentence: z.string(),
	literal: z.string().optional()
});

// Folder name (inside words/) -> the part_of_speech value expected in the file
export const FOLDER_TO_POS = {
	nouns: 'noun',
	verbs: 'verb',
	adjectives: 'adjective',
	'pro-forms': 'pro-form',
	'queries': 'query',
	uncountable: 'uncountable',
	misc: 'misc'
} as const;

export const PartOfSpeechSchema = z.enum(Object.values(FOLDER_TO_POS) as [string, ...string[]]);

export const EntrySchema = z.object({
	konkani_word: z.string(),
	meaning: z.array(z.string()).min(1),
	part_of_speech: PartOfSpeechSchema,
	keywords: z.array(z.string()),
	forms: z.array(FormSchema).optional(),
	examples: z.array(ExampleSchema).optional(),
	categories: z.array(z.enum(categories)).optional(),
	note: z.string().nullable().optional()
});

export type Entry = z.infer<typeof EntrySchema>;
export type Form = z.infer<typeof FormSchema>;
export type Example = z.infer<typeof ExampleSchema>;
