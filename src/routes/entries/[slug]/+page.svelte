<script lang="ts">
	import { resolve } from '$app/paths';

	/* eslint-disable svelte/require-each-key */

	let { data } = $props();
	// svelte-ignore state_referenced_locally
	console.log(data);
</script>

<h1><div class="word">{data.konkani_word}</div></h1>
<h3 class="part-of-speech">{data.part_of_speech}</h3>
<br />
<p>meaning:</p>
<ul>
	{#each data.meaning as meaning}
		<li>{meaning}</li>
	{/each}
</ul>
<br />

<ul>
	{#each data.forms as form}
		<li>{form.label} ({form.english}): {form.value}</li>
	{/each}
</ul>
<p>examples:</p>
<ul>
	{#each data.examples as example}
		<li>
			{example.konkani_sentence} - {example.english_sentence}
		</li>
	{/each}
</ul>
<p>categories:</p>
<ul>
	{#each data.categories as category}
		<a href={resolve(`/categories/${category}`)}> <li>{category}</li> </a>
	{/each}
</ul>
