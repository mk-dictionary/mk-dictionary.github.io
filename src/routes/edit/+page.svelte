<script lang="ts">
	/* eslint-disable @typescript-eslint/no-unused-vars */

	// this file helps create new entries for our dictionary.
	import { encode, decode } from '@toon-format/toon';
	import { type Category, categories as allCategories } from '../../../schema/categories';
	import type { Entry } from '../../../schema/entry';
	import { resolve } from '$app/paths';
	import { editPageStyles } from '$lib/styles.css.js';
	let konkani_word = $state('');
	let meaning: string[] = $state(['']);
	const parts_of_speech = [
		'nouns',
		'verbs',
		'adjectives',
		'pro-forms',
		'queries',
		'uncountable',
		'misc'
	] as const;
	let inputToonString = $state('');
	let isNote = $state(false);
	let note = $state('');
	let part_of_speech: (typeof parts_of_speech)[number] = $state('nouns'); // default value
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
<h2>
	<i>Spelling:</i>see <a href={resolve('/edit/spelling')}>Spelling Guide</a> for our spelling conventions
</h2>
<p>the word, in konkani:</p>
<p>this should be singular (one)</p>
<input type="text" placeholder="Enter a new word, in konkani" bind:value={konkani_word} />
{#if part_of_speech == 'nouns'}
	<p>
		remember to put the singular form of the word, i.e. maazaar (cat) as opposed to maazraa (cats)
	</p>
{:else if part_of_speech == 'verbs'}
	<p>in the command/request form, i.e. vos (as opposed to veta, vosun, vosunk, etc.)</p>
{/if}
<br />

<h2>Meanings</h2>
<p>english translations of the word, except for synonyms</p>
<table class={editPageStyles.table}>
	<tbody class={editPageStyles.tableBody}>
		<tr class={editPageStyles.tableRow}>
			<th>Meaning</th>
			<th></th>
		</tr>
		{#each meaning as m, index (index)}
			<tr class={editPageStyles.tableRow}>
				<td
					><input class={editPageStyles.tableCellInput}
						type="text"
						placeholder="Enter the meaning, in english"
						bind:value={meaning[index]}
					/></td
				>
				<td class={editPageStyles.tableCell}
					><button class={editPageStyles.removeRowButton} onclick={() => meaning.splice(index, 1)}
						>Remove</button
					></td
				>
			</tr>
		{/each}
		<tr>
			<td colspan="2"
				><button class={editPageStyles.addRowButton} onclick={() => meaning.push('')}
					>Add Meaning</button
				></td
			>
		</tr>
	</tbody>
</table>
<br />
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
{#if part_of_speech == 'nouns'}
	<p>
		For nouns: remember to put a <strong>plural</strong> (i.e. maazaar(cat) -> maazraa (cats)), even
		if the word itself doesn't change! If it's a concept without a plural, then part of speech
		should be <b>uncountable</b>
	</p>

	<br />
	<p>Also put irregular cases and other forms</p>
{:else if part_of_speech == 'verbs'}
	<p>
		For verbs: Remember to add a <strong>past tense!</strong> if the verb never means past tense, it should
		be in misc
	</p>
	<br />
	<p>Also add irregular conjugations i.e. (vos -> veta)</p>
{:else if part_of_speech == 'adjectives'}
	<p>does this word sound different for masculine/feminine/plural subjects? add that here!</p>
{:else if part_of_speech == 'misc'}
	<p>
		what are some of the most common ways to use this pattern? is there a way to negate the pattern?
	</p>
{/if}
<p>
	the label is a short description of the form, i.e. <strong
		>plural, past tense, feminine, etc.</strong
	>, what has <i> changed </i> about the word
</p>
<p>put the english version of the form here</p>
<p>put the konkani version of the form here</p>
<table class={editPageStyles.table}>
	<thead>
		<tr>
			<th>Label</th>
			<th>English Form</th>
			<th>Konkani Form</th>
			<th></th>
		</tr>
	</thead>

	<tbody class={editPageStyles.tableBody}>
		{#each forms as _form, index (index)}
			<tr class={editPageStyles.tableRow}>
				<td class={editPageStyles.tableCell}>
					<input type="text" placeholder="label: ie plural" bind:value={forms[index].label} />
				</td>
				<td class={editPageStyles.tableCell}>
					<input class={editPageStyles.tableCellInput}
						type="text"
						placeholder="english form; ie cats"
						bind:value={forms[index].english}
					/>
				</td>
				<td class={editPageStyles.tableCell}>
					<input class={editPageStyles.tableCellInput}
						type="text"
						placeholder="konkani form; ie maazraa"
						bind:value={forms[index].value}
					/>
				</td>
				<td class={editPageStyles.tableCell}>
					<button class={editPageStyles.removeRowButton} onclick={() => forms.splice(index, 1)}>Remove</button>
				</td>
			</tr>
		{/each}
	</tbody>
</table>
<button class={editPageStyles.addRowButton} onclick={() => forms.push({ label: '', english: '', value: '' })}>Add Form</button>

<h2>Examples</h2>
<p>try and get a wide variety of ways to use the word</p>
<table class={editPageStyles.table}>
	<tbody class={editPageStyles.tableBody}>
		<tr>
			<th style=" width: 1em">Example (konkani)</th>
			<th style=" width: 1em">Translation (english)</th>
			<th style=" width: 1em; overflow-wrap: break-word;"
				>Literal translation (optional, when example and translation very different literally)</th
			>
		</tr>
		{#each examples as example, index (index)}
			<tr class={editPageStyles.tableRow}>
				<td class={editPageStyles.tableCell}
					><input class={editPageStyles.tableCellInput}
						type="text"
						placeholder="example, in konkani"
						bind:value={examples[index].konkani_sentence}
					/></td
				>
				<td class={editPageStyles.tableCell}
					><input class={editPageStyles.tableCellInput}
						type="text"
						placeholder="translation, in english"
						bind:value={examples[index].english_sentence}
					/></td
				>
				<td class={editPageStyles.tableCell}
					><input class={editPageStyles.tableCellInput}
						type="text"
						placeholder="literal, in english"
						bind:value={examples[index].literal}
					/></td
				>
				<td class={editPageStyles.tableCell}><button class={editPageStyles.removeRowButton} onclick={() => examples.splice(index, 1)}>Remove</button></td>
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
	<span
		style="border: 1px solid black;  margin: 0.5em; break-inside: avoid; display: inline-block;"
	>
		<input type="checkbox" value={category} bind:group={categories} />
		{category}
	</span>
{/each}
<br />
<input type="checkbox" bind:checked={isNote} /> add a note?
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
<p>this is how you submit new entries</p>
<ol>
	<li>
		Check to make sure this is not a duplicate, searching in <a
			href="https://github.com/mk-dictionary/mk-dictionary.github.io/issues"
			>the submitted
		</a>
		as well as the <a href={resolve('/')}>main dictionary</a>
	</li>
	<li>Make sure you are logged into your GitHub account, if you don't have one, make one</li>
	<li>
		Click on <a
			href="https://github.com/mk-dictionary/mk-dictionary.github.io/issues/new?template=1-new-entry.yml&title={encodeURIComponent(
				'[New Entry]: ' + konkani_word
			)}&entry-code={encodeURIComponent(toonString)}">this link</a
		>
	</li>
	<li>check the checkboxes</li>
	<li>and press create</li>
</ol>

<hr />
<p>debugging: do not touch</p>
<button onclick={() => navigator.clipboard.writeText(toonString)}>Copy entry</button>
<br />

<pre>{toonString}</pre>
