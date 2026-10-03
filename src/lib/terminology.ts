const partOfSpeechLabels: Record<string, string> = {
	nouns: 'Nouns',
	verbs: 'Verbs',
	adjectives: 'Adjectives',
	'pro-forms': 'Pro-forms',
	queries: 'Queries',
	uncountable: 'Uncountable',
	misc: 'Misc'
};

export function getPartOfSpeechLabel(partOfSpeech: string): string {
	return partOfSpeechLabels[partOfSpeech] ?? partOfSpeech;
}
