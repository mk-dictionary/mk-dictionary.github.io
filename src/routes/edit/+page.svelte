<script lang="ts">
	/* eslint-disable @typescript-eslint/no-unused-vars */

	// this file helps create new entries for our dictionary.
	import { encode, decode } from '@toon-format/toon';
	import { type Category, categories as allCategories } from '../../../schema/categories';
	import type { Entry } from '../../../schema/entry';
	let konkani_word = $state('');
	let meaning: string[] = $state(['']);
	const parts_of_speech = [
		'noun',
		'verb',
		'adjective',
		'pro-form',
		'query',
		'uncountable',
		'misc'
	] as const;
	let inputToonString = $state('');
	let isNote = $state(false);
	let note = $state('');
	let part_of_speech: (typeof parts_of_speech)[number] = $state('noun'); // default value
	let forms = $state<{ label: string; english: string; value: string }[]>([]);
	let keywords: string[] = $state<string[]>([]);

	let examples: { konkani_sentence: string; english_sentence: string; literal: string | null }[] =
		$state([{ konkani_sentence: '', english_sentence: '', literal: null }]);
	let categories: Category[] = $state([]);

	let entry: Entry = $derived.by(() => {
		return {
			konkani_word,
			meaning,
			part_of_speech,
			keywords,
			forms,
			// there's gotta be some way to replace "" and " " with null
			examples: examples.map((e) => ({
				konkani_sentence: e.konkani_sentence,
				english_sentence: e.english_sentence,
				literal: e.literal || null
			})),
			categories,
			note: isNote ? note : null
		};
	});

	let toonString = $derived.by(() => {
		return encode(entry, { delimiter: '|' });
	});

	// import option as well
	function importToon(toon: string) {
		const importedEntry = decode(toon) as Entry;
		konkani_word = importedEntry.konkani_word;
		meaning = importedEntry.meaning;
		part_of_speech = importedEntry.part_of_speech as typeof part_of_speech;
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
{#each parts_of_speech as pos, i (i)}
	<input type="radio" bind:group={part_of_speech} value={parts_of_speech[i]} /> {pos}
{/each}
<br />
<p> the word, in konkani:</p><input type="text" placeholder="Enter a new word, in konkani" bind:value={konkani_word} />
{#if part_of_speech == "noun"}
	<p>this should be singular (one)</p>
	{:else if part_of_speech == "verb"}
	<p> in the command/request form, i.e. vos (as opposed to veta, vosun, vosunk, etc.)</p>
	{:else if part_of_speech == "adjective"}
{/if}


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
<h2>Keywords</h2>
<p>synonyms for the english meanings as well as common alternate spellings</p>
<ul>
	{#each keywords as keyword, i (i)}
		<li><input type="text" bind:value={keywords[i]} /></li>
	{/each}
	<button onclick={() => keywords.push('')}>Add Keyword</button>
	<button onclick={() => keywords.pop()}>Remove Keyword</button>
</ul>

<h2>Forms</h2>
<p>tenses, cases, irregular conjugations, plurals, variations due to gender</p>
<br />
{#if part_of_speech == 'noun'}
	<p>
		remember to put a plural! i.e. maazaar(cat) -> maazraa (cats), even if the word itself doesn't
		change! If it's a concept without a plural, then part of speech should be <b>uncountable</b>
	</p>

	<br />
	<p>Also put irregular cases and other forms (i.e. )</p>
{:else if part_of_speech == 'verb'}
	<p>Remember to add a past tense! if the verb never means past tense, it should be in misc</p>
	<br />
	<p>Also add irregular conjugations i.e. (vos -> veta)</p>
{:else if part_of_speech == 'adjective'}
	<p>does this word sound different for masculine/feminine/plural subjects? add that here!</p>
	{:else if part_of_speech == 'misc'}
	<p>what are some of the most common ways to use this pattern? is there a way to negate the pattern?</p>

{/if}
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

<h2>Examples</h2>
<p> try and get a wide variety of ways to use the word </p>
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
				<td
					><input
						type="text"
						placeholder="Enter the translation, in english"
						bind:value={examples[index].literal}
					/></td
				>
				<td><button onclick={() => examples.splice(index, 1)}>Remove</button></td>
			</tr>
		{/each}
		<tr>
			<td colspan="3"
				><button
					onclick={() =>
						examples.push({ konkani_sentence: '', english_sentence: '', literal: null })}
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
<p>to edit an existing entry</p>
<textarea bind:value={inputToonString} placeholder="Enter a .toon string"></textarea>
<button onclick={() => importToon(inputToonString)}>Import</button>
<br />


<h1>Result</h1>
<button onclick={() => navigator.clipboard.writeText(toonString)}>Copy entry</button>
<br />

<pre>{toonString}</pre>
