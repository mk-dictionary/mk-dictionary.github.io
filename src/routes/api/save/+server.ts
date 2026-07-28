import { writeFileSync, unlinkSync, existsSync, mkdirSync } from 'fs';
import { resolve, relative, normalize } from 'path';
import { json } from '@sveltejs/kit';
import { FOLDER_TO_POS } from '../../../../schema/entry';

const ENTRIES_ROOT = resolve('entries');

function isSafePath(p: string): boolean {
	const full = resolve(ENTRIES_ROOT, p);
	return full.startsWith(ENTRIES_ROOT) && p.endsWith('.toon');
}

const FOLDER_BY_POS: Record<string, string> = {};
for (const [folder, pos] of Object.entries(FOLDER_TO_POS)) {
	FOLDER_BY_POS[pos] = folder;
}

export async function POST({ request }) {
	const body = await request.json();
	const { path: filePath, content } = body;

	if (!filePath || typeof content !== 'string') {
		return json({ error: 'missing path or content' }, { status: 400 });
	}

	const safePath = normalize(filePath).replace(/\\/g, '/').replace(/^\/+/, '');
	if (!isSafePath(safePath)) {
		return json({ error: 'invalid path' }, { status: 400 });
	}

	const fullPath = resolve(ENTRIES_ROOT, safePath);
	const dir = resolve(fullPath, '..');
	if (!existsSync(dir)) {
		mkdirSync(dir, { recursive: true });
	}

	writeFileSync(fullPath, content, 'utf-8');
	return json({ ok: true, path: safePath });
}

export async function DELETE({ request }) {
	const body = await request.json();
	const { path: filePath } = body;

	if (!filePath) {
		return json({ error: 'missing path' }, { status: 400 });
	}

	const safePath = normalize(filePath).replace(/\\/g, '/').replace(/^\/+/, '');
	if (!isSafePath(safePath)) {
		return json({ error: 'invalid path' }, { status: 400 });
	}

	const fullPath = resolve(ENTRIES_ROOT, safePath);
	if (!existsSync(fullPath)) {
		return json({ error: 'file not found' }, { status: 404 });
	}

	unlinkSync(fullPath);
	return json({ ok: true, path: safePath });
}
