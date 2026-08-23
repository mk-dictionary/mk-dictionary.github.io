import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { decode, encode } from '@toon-format/toon';

const baseDir = 'entries';

function collectFiles(directory: string): string[] {
	const files: string[] = [];

	for (const item of readdirSync(directory, { withFileTypes: true })) {
		const path = join(directory, item.name);
		if (item.isDirectory()) files.push(...collectFiles(path));
		else if (item.isFile() && item.name.endsWith('.toon')) files.push(path);
	}

	return files;
}

let changed = 0;

for (const path of collectFiles(baseDir)) {
	const raw = readFileSync(path, 'utf-8');
	const entry = decode(raw) as {
		forms?: unknown[];
		examples?: Array<Record<string, unknown>>;
	};

	let modified = false;

	if (entry.forms === undefined) {
		entry.forms = [];
		modified = true;
	}

	for (const example of entry.examples ?? []) {
		if (example.literal === undefined) {
			example.literal = null;
			modified = true;
		}
	}

	if (modified) {
		writeFileSync(path, `${encode(entry, { delimiter: '|' }).trimEnd()}\n`, 'utf-8');
		changed += 1;
		console.log(`✓ ${path}`);
	}
}

console.log(`\nStandardized ${changed} of ${collectFiles(baseDir).length} TOON files.`);