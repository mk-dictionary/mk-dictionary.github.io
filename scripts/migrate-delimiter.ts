import { readFileSync, readdirSync, writeFileSync } from 'fs';
import { join } from 'path';
import { decode, encode } from '@toon-format/toon';

const baseDir = 'entries';

function collectFiles(): string[] {
	const all: string[] = [];
	for (const folder of readdirSync(baseDir)) {
		const dir = join(baseDir, folder);
		for (const file of readdirSync(dir)) {
			if (file.endsWith('.toon')) all.push(join(dir, file));
		}
	}
	return all;
}

const files = collectFiles();

for (const path of files) {
	const raw = readFileSync(path, 'utf-8');
	const entry = decode(raw) as Record<string, unknown>;

	const konkaniWord = entry.konkani_word as string;
	const meanings = entry.meaning as string[];
	const keywords = (entry.keywords as string[]) ?? [];

	const strip = new Set([konkaniWord.toLowerCase(), ...meanings.map((m) => m.toLowerCase())]);

	entry.keywords = keywords.filter((kw: string) => !strip.has(kw.toLowerCase()));

	const out = encode(entry, { delimiter: '|' });
	writeFileSync(path, out, 'utf-8');
	console.log(`✓ ${path}`);
}

console.log(`\nMigrated ${files.length} files to pipe delimiter.`);
