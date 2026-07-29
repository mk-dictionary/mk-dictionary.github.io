<script lang="ts">
	import { resolve } from '$app/paths';

	/* eslint-disable svelte/require-each-key */

	let { data } = $props();
	// svelte-ignore state_referenced_locally
	console.log(data);
</script>

<div class="entry-container">
	<h1 class="word">{data.konkani_word}</h1>
</div>
<h3 class="part-of-speech">{data.part_of_speech}</h3>
<div class="meaning-container">
	<h2 class="meaning">Meaning:</h2>
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
	<ul>
		{#each data.forms as form}
			<li>{form.label} ({form.english}): {form.value}</li>
		{/each}
	</ul>
</div>
<div class="example-container">
	<h2 class="example">Examples:</h2>
	<ul>
		{#each data.examples as example}
			<li>
				{example.konkani_sentence} - {example.english_sentence}
			</li>
		{/each}
	</ul>
</div>
<div class="category-container">
	<h2 class="category">Categories:</h2>
	<ul>
		{#each data.categories as category}
			<li><a href={resolve(`/categories/${category}`)}>{category}</a></li>
		{/each}
	</ul>
</div>