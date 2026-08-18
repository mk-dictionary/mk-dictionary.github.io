import { readdirSync, readFileSync } from 'fs';
import { join } from 'path';
import { json } from '@sveltejs/kit';
import { decode } from '@toon-format/toon';

const ENTRIES_ROOT = 'entries';

function getAllEntries() {
	const entries: Record<string, unknown>[] = [];
	for (const folder of readdirSync(ENTRIES_ROOT)) {
		const dir = join(ENTRIES_ROOT, folder);
		for (const file of readdirSync(dir)) {
			if (!file.endsWith('.toon')) continue;
			const path = join(dir, file);
			const raw = readFileSync(path, 'utf-8');
			const data = decode(raw) as Record<string, unknown>;
			entries.push({ ...data, _path: `${folder}/${file.replace('.toon', '')}`, _file: `/${path}` });
		}
	}
	return entries;
}

export function GET() {
	return json(getAllEntries());
}
