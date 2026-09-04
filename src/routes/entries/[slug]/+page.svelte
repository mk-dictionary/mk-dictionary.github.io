<script lang="ts">
	import { resolve } from '$app/paths';

	/* eslint-disable svelte/require-each-key */

	let { data } = $props();
	import { entryPageStyles } from '$lib/styles.css.js';
</script>

<div class={entryPageStyles.wordContainer}>
	<h1 class={entryPageStyles.entryWord}>{data.konkani_word}</h1>
</div>
<h3 class={entryPageStyles.entryPOS}>{data.part_of_speech}</h3>
<div class={entryPageStyles.meaningContainer}>
	<h2 class={entryPageStyles.meanings}>Meaning:</h2>
	<ul>
		{#if data.meaning.length === 0}
			<li>ERROR: no meaning found</li>
		{/if}
		{#each data.meaning as meaning}
			<li>{meaning}</li>
		{/each}
	</ul>
</div>

<div class="meaning-container">
	<h2 class="meaning">Forms:</h2>
	<ul></ul>
</div>
<table class={entryPageStyles.formTable}>
	<tbody>
		{#each data.forms as form}
			<tr class={entryPageStyles.formTableRow}>
				<td class={entryPageStyles.formTableLabelCell}>{form.label}</td>
				<td class={entryPageStyles.formTableEnglishCell}> ({form.english}) </td>
				<td
					class={entryPageStyles.formTableValueCell}>{form.value}</td
				>
			</tr>
		{/each}
	</tbody>
</table>
	<h2 class={entryPageStyles.exampleTableLiteral}>Examples:</h2>

<table class={entryPageStyles.exampleTable}>
	<tbody>
		{#each data.examples as example}
			<tr class={entryPageStyles.exampleTableRow}>
				<td class={entryPageStyles.exampleTableKonkani}>{example.konkani_sentence}</td>
				<td class={entryPageStyles.exampleTableEnglish}>{example.english_sentence}</td>
			</tr>
		{/each}
	</tbody>
</table>

<div class="category-container">
	<h2 class="category">Categories:</h2>
	<ul>
		{#each data.categories as category}
			<li><a href={resolve(`/categories/${category}`)}>{category}</a></li>
		{/each}
	</ul>
</div>
