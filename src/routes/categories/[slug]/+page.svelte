<script lang="ts">
	/* eslint-disable svelte/no-navigation-without-resolve */

	/* eslint-disable svelte/require-each-key */

	let { data } = $props();
	// svelte-ignore state_referenced_locally
	console.log(data);
	// svelte-ignore state_referenced_locally
	const words = data.words;
</script>



<div class="entries-grid">
{#each words as entry}
	<article class="entry-card">
		<a href={entry.path} class="entry-link">
			<span class="entry-word">{entry.konkani_word}</span>
			<span class="entry-meaning">{entry.meaning[0]}</span>
			<span class="entry-pos">({entry.part_of_speech})</span>
		</a>
	</article>
{/each}
</div>