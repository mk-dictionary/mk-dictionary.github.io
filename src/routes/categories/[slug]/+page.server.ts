import { categories } from '../../../../schema/categories';
import type { EntryGenerator } from './$types';
import { entries as dictEntries } from '$lib/import';
export const entries: EntryGenerator = () => {
	return categories.map((category) => {
		return { slug: category };
	});
};

export const prerender = true;

import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const words = dictEntries.filter((entry) => entry.categories.includes(params.slug));

	return { words };
};
