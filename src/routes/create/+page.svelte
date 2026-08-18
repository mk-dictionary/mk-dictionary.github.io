<script lang="ts">
	/* eslint-disable @typescript-eslint/no-unused-vars */

	// this file helps create new entries for our dictionary.
	import { encode, decode } from '@toon-format/toon';
	import { type Category, categories as allCategories } from '../../../schema/categories';
	import type { Entry } from '../../../schema/entry';
	let konkani_word = $state('');
	let meaning: string[] = $state(['']);
	const parts_of_speech = ['noun', 'verb', 'adjective', 'pro-form', 'uncountable', 'misc'] as const;
	let inputToonString = $state('');
	let isNote = $state(false);
	let note = $state('');
	let part_of_speech: (typeof parts_of_speech)[number] = $state('noun'); // default value
	let forms = $state<{ label: string; english: string; value: string }[]>([]);
	let addedKeywords: string[] = $state<string[]>([]);

	let examples: { konkani_sentence: string; english_sentence: string }[] = $state([
		{ konkani_sentence: '', english_sentence: '' }
	]);
	let categories: Category[] = $state([]);

	let entry: Entry = $derived.by(() => {
		return {
			konkani_word,
			meaning,
			part_of_speech,
			keywords: addedKeywords,
			forms,
			examples,
			categories,
			note: isNote ? note : null
		};
	});

	let toonString = $derived.by(() => {
		return encode(entry, { delimiter: '|' });
	});

	// import option as well
	function importToon(toon: string) {
		const importedEntry = decode(toon, { delimiter: '|' }) as Entry;
		konkani_word = importedEntry.konkani_word;
		meaning = importedEntry.meaning;
		part_of_speech = importedEntry.part_of_speech;
		keywords = importedEntry.keywords;
		forms = importedEntry.forms;
		examples = importedEntry.examples;
		categories = importedEntry.categories;
		if (importedEntry.note) {
			isNote = true;
			note = importedEntry.note;
		} else {
			isNote = false;
			note = '';
		}
	}
</script>

<h1>Create a new entry</h1>
<input type="radio" bind:group={part_of_speech} value="noun" /> Noun
<input type="radio" bind:group={part_of_speech} value="verb" /> Verb
<input type="radio" bind:group={part_of_speech} value="adjective" /> Adjective
<input type="radio" bind:group={part_of_speech} value="misc" /> Misc
<br />
<input type="text" placeholder="Enter a new word, in konkani" bind:value={konkani_word} />
<table>
	<tbody>
		<tr>
			<th>Meaning</th>
			<th></th>
		</tr>
		{#each meaning as m, index (index)}
			<tr>
				<td
					><input
						type="text"
						placeholder="Enter the meaning, in english"
						bind:value={meaning[index]}
					/></td
				>
				<td><button onclick={() => meaning.splice(index, 1)}>Remove</button></td>
			</tr>
		{/each}
		<tr>
			<td colspan="2"><button onclick={() => meaning.push('')}>Add Meaning</button></td>
		</tr>
	</tbody>
</table>
<br />

<button onclick={() => meaning.push('')}>Add Meaning</button>
<br />
keywords:
<ul>
	{#each addedKeywords as keyword, i (i)}
		<li><input type="text" bind:value={addedKeywords[i]} /></li>
	{/each}
	<button onclick={() => addedKeywords.push('')}>Add Keyword</button>
	<button onclick={() => addedKeywords.pop()}>Remove Keyword</button>
</ul>

forms
<ul>
	{#each forms as _form, index (index)}
		<li>
			<input
				type="text"
				placeholder="Enter the label: the form description e.g. plural"
				bind:value={forms[index].label}
			/>
			<input
				type="text"
				placeholder="Enter the english translation"
				bind:value={forms[index].english}
			/>
			<input type="text" placeholder="Enter the value, konkani" bind:value={forms[index].value} />
			<button onclick={() => forms.splice(index, 1)}>Remove</button>
		</li>
	{/each}
	<button onclick={() => forms.push({ label: '', english: '', value: '' })}>Add Form</button>
</ul>

examples
<table>
	<tbody>
		<tr>
			<th>Example</th>
			<th>Translation</th>
		</tr>
		{#each examples as example, index (index)}
			<tr>
				<td
					><input
						type="text"
						placeholder="Enter the example, in konkani"
						bind:value={examples[index].konkani_sentence}
					/></td
				>
				<td
					><input
						type="text"
						placeholder="Enter the translation, in english"
						bind:value={examples[index].english_sentence}
					/></td
				>
				<td><button onclick={() => examples.splice(index, 1)}>Remove</button></td>
			</tr>
		{/each}
		<tr>
			<td colspan="3"
				><button
					onclick={() => examples.push({ konkani_sentence: '', english_sentence: '', literal: '' })}
					>Add Example</button
				></td
			>
		</tr>
	</tbody>
</table>

{#each allCategories as category (category)}
	<label>
		<input type="checkbox" value={category} bind:group={categories} />
		{category}
	</label>
{/each}
<input type="checkbox" bind:checked={isNote} /> note?
{#if isNote}
	<textarea bind:value={note} placeholder="Enter your note here"></textarea>
{/if}

<br />
<h1>Import a .toon string</h1>
<textarea bind:value={inputToonString} placeholder="Enter a .toon string" ></textarea>
<button onclick={() => importToon(inputToonString)}>Import</button>
<br />
<h1>Result</h1>
<br />

<pre>{toonString}</pre>
