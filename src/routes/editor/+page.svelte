<script lang="ts">
	import { encode } from '@toon-format/toon';

	const allEntries = import.meta.glob('/entries/**/*.toon', { eager: true, import: 'default' });
	const allPaths = Object.keys(allEntries);

	type EntryData = {
		konkani_word: string;
		meaning: string[];
		part_of_speech: string;
		keywords: string[];
		forms: { label: string; english: string; value: string }[];
		examples: { konkani_sentence: string; english_sentence: string; literal?: string }[];
		categories: string[];
		note: string | null;
	};

	type EntryItem = EntryData & { _path: string; _file: string };

	const entries: EntryItem[] = allPaths.map((p) => {
		const d = allEntries[p] as EntryData;
		const file = p
			.replace('.toon', '')
			.replace(/\\/g, '/')
			.replace(/^\/?entries\//, '');
		return { ...d, _path: file, _file: p };
	});

	const categories_list = [
		'beginner',
		'family',
		'friends',
		'meals',
		'cooking',
		'animals',
		'clothing',
		'household',
		'buildings',
		'school',
		'work',
		'times',
		'gathering',
		'gardening',
		'weather',
		'nature',
		'temperature',
		'art',
		'religion',
		'travel',
		'transportation',
		'poetic',
		'body parts',
		'health',
		'abstract',
		'pro-form',
		'query'
	];

	const FOLDER_BY_POS: Record<string, string> = {
		noun: 'nouns',
		verb: 'verbs',
		adjective: 'adjectives',
		pronoun: 'pronouns',
		uncountable: 'uncountable',
		misc: 'misc'
	};

	let search = $state('');
	let selected = $state<EntryItem | null>(null);

	let word = $state('');
	let meanings = $state<string[]>(['']);
	let pos = $state('noun');
	let keywords = $state<string[]>([]);
	let forms = $state<{ label: string; english: string; value: string }[]>([]);
	let examples = $state<{ konkani_sentence: string; english_sentence: string; literal?: string }[]>(
		[]
	);
	let cats = $state<string[]>([]);
	let note = $state('');
	let hasNote = $state(false);
	let newFilename = $state('');
	let saveMsg = $state('');
	let saveError = $state(false);

	let searchResults = $derived(
		search
			? entries.filter(
					(e) =>
						e.konkani_word.toLowerCase().includes(search.toLowerCase()) ||
						e.meaning.some((m) => m.toLowerCase().includes(search.toLowerCase())) ||
						e._path.toLowerCase().includes(search.toLowerCase()) ||
						e.keywords.some((k) => k.toLowerCase().includes(search.toLowerCase()))
				)
			: entries
	);

	function loadEntry(e: EntryItem) {
		selected = e;
		word = e.konkani_word;
		meanings = [...e.meaning];
		pos = e.part_of_speech;
		keywords = [...e.keywords];
		forms = e.forms ? e.forms.map((f) => ({ ...f })) : [];
		examples = e.examples ? e.examples.map((x) => ({ ...x })) : [];
		cats = [...e.categories];
		if (e.note) {
			hasNote = true;
			note = e.note;
		} else {
			hasNote = false;
			note = '';
		}
		newFilename = '';
		saveMsg = '';
	}

	function newEntry() {
		selected = null;
		word = '';
		meanings = [''];
		pos = 'noun';
		keywords = [];
		forms = [];
		examples = [];
		cats = [];
		hasNote = false;
		note = '';
		newFilename = '';
		saveMsg = '';
	}

	let entryData = $derived<EntryData>({
		konkani_word: word,
		meaning: meanings.filter((m) => m.trim()),
		part_of_speech: pos,
		keywords: keywords.filter((k) => k.trim()),
		forms: forms.filter((f) => f.label || f.english || f.value),
		examples: examples.filter((x) => x.konkani_sentence || x.english_sentence),
		categories: cats,
		note: hasNote && note ? note : null
	});

	let toonOutput = $derived(encode(entryData, { delimiter: '|' }));

	let targetFile = $derived(
		
		selected
			? selected._file.replace("/entries", "")
			// why is this saving to entries/entries/... instead of entries/...? because the FOLDER_BY_POS is returning a folder name, not a full path. So we need to prepend "entries/" to it.
			: `/${FOLDER_BY_POS[pos]}/${(newFilename || word).replace(/\s+/g, '_')}.toon`
	);

	async function save() {
		saveMsg = '';
		saveError = false;
		const res = await fetch('/api/save', {
			method: 'POST',
			headers: { 'content-type': 'application/json' },
			body: JSON.stringify({ path: targetFile, content: toonOutput })
		});
		if (res.ok) {
			saveMsg = `Saved: ${targetFile}`;
			saveError = false;
		} else {
			const err = await res.json();
			saveMsg = `Error: ${err.error || res.status}`;
			saveError = true;
		}
	}

	async function del() {
		if (!selected) return;
		if (!confirm(`Delete ${selected._file}?`)) return;
		saveMsg = '';
		saveError = false;
		const res = await fetch('/api/save', {
			method: 'DELETE',
			headers: { 'content-type': 'application/json' },
			body: JSON.stringify({ path: selected._file })
		});
		if (res.ok) {
			saveMsg = `Deleted: ${selected._file}`;
			saveError = false;
		} else {
			const err = await res.json();
			saveMsg = `Error: ${err.error || res.status}`;
			saveError = true;
		}
	}
</script>

<svelte:head><title>Editor</title></svelte:head>

<h1>Editor</h1>
<a href="/">← Back to site</a>
<button onclick={newEntry}>+ New Entry</button>

<h2>Browse / Search</h2>
<input type="text" bind:value={search} placeholder="Search entries..." />

<div style="max-height:300px;overflow-y:auto;border:1px solid #ccc">
	<table>
		<tbody>
			{#each searchResults as e (e._path)}
				<tr
					onclick={() => loadEntry(e)}
					style="cursor:pointer;background:{selected?._path === e._path ? '#eee' : ''}"
				>
					<td>{e.konkani_word}</td>
					<td>{e.part_of_speech}</td>
					<td>{e._path}</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>

<hr />

<h2>{selected ? 'Edit' : 'Create'} Entry</h2>

{#if !selected}
	<div>
		<label
			>Filename (optional, defaults to word): <input type="text" bind:value={newFilename} /></label
		>
	</div>
{/if}

<div>
	<label>Konkani Word: <input type="text" bind:value={word} /></label>
</div>

<div>
	<label
		>Part of Speech:
		<select bind:value={pos}>
			<option value="noun">noun</option>
			<option value="verb">verb</option>
			<option value="adjective">adjective</option>
			<option value="pronoun">pronoun</option>
			<option value="uncountable">uncountable</option>
			<option value="misc">misc</option>
		</select>
	</label>
</div>

<h3>Meanings</h3>
{#each meanings as m, i (i)}
	<div>
		<input type="text" bind:value={meanings[i]} />
		<button onclick={() => meanings.splice(i, 1)}>x</button>
	</div>
{/each}
<button onclick={() => meanings.push('')}>+ Add Meaning</button>

<h3>Keywords</h3>
{#each keywords as k, i (i)}
	<div>
		<input type="text" bind:value={keywords[i]} />
		<button onclick={() => keywords.splice(i, 1)}>x</button>
	</div>
{/each}
<button onclick={() => keywords.push('')}>+ Add Keyword</button>

<h3>Forms</h3>
{#if pos === 'noun'}
	<p style="font-size:0.85em;color:#666">Recommendation: nouns should have a plural form, or use <strong>uncountable</strong> POS instead.</p>
{:else if pos === 'verb'}
	<p style="font-size:0.85em;color:#666">Recommendation: verbs should have at least a present-tense and past-tense form.</p>
{/if}
{#each forms as f, i (i)}
	<div>
		<input type="text" placeholder="label" bind:value={forms[i].label} />
		<input type="text" placeholder="english" bind:value={forms[i].english} />
		<input type="text" placeholder="value" bind:value={forms[i].value} />
		<button onclick={() => forms.splice(i, 1)}>x</button>
	</div>
{/each}
<button onclick={() => forms.push({ label: '', english: '', value: '' })}>+ Add Form</button>

<h3>Examples</h3>
{#each examples as x, i (i)}
	<div>
		<input type="text" placeholder="Konkani" bind:value={examples[i].konkani_sentence} />
		<input type="text" placeholder="English" bind:value={examples[i].english_sentence} />
		<input type="text" placeholder="Literal (optional)" bind:value={examples[i].literal} />
		<button onclick={() => examples.splice(i, 1)}>x</button>
	</div>
{/each}
<button onclick={() => examples.push({ konkani_sentence: '', english_sentence: '' })}
	>+ Add Example</button
>

<h3>Categories</h3>
{#each categories_list as c (c)}
	<label>
		<input type="checkbox" value={c} bind:group={cats} />
		{c}
	</label>
{/each}

<h3>Note</h3>
<label><input type="checkbox" bind:checked={hasNote} /> Has note?</label>
{#if hasNote}
	<textarea bind:value={note} rows="2" cols="60"></textarea>
{/if}

<hr />

<h2>Output (.toon)</h2>
<pre style="white-space:pre-wrap;background:#f5f5f5;padding:8px">{toonOutput}</pre>
<button onclick={() => navigator.clipboard.writeText(toonOutput)}>Copy to clipboard</button>

<div style="margin-top:12px">
	<button onclick={save}>💾 Save to {targetFile}</button>
	{#if selected}
		<button onclick={del} style="margin-left:8px">🗑 Delete</button>
	{/if}
</div>

{#if saveMsg}
	<p style="color:{saveError ? 'red' : 'green'}">{saveMsg}</p>
{/if}
