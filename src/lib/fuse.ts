import type { IFuseOptions } from 'fuse.js';
import Fuse from 'fuse.js';
import { entries } from '$lib/import';

const options: IFuseOptions<(typeof searchEntries)[0]> = {
	keys: ['keywords', 'konkani_word', 'meaning']
};

export const searchEntries = entries.map((entry) => {
	return {
		keywords: entry.keywords.join(' '),
		path: entry.path,
		konkani_word: entry.konkani_word,
		meaning: entry.meaning.join(' '),
		part_of_speech: entry.part_of_speech
	};
});

export const fuse = new Fuse(searchEntries, options);
