<script lang="ts">
	import {resolve} from '$app/paths';
	/* eslint-disable svelte/require-each-key */

	let { data } = $props();
	// svelte-ignore state_referenced_locally
	const words = data.words;

	import {catPageStyles} from '$lib/styles.css.js'
</script>



<div class="entries-grid">
{#each words as entry}
	<article class="entry-card">
		<a href={resolve(`/${entry.path}`)} class="entry-link">
			<span class={catPageStyles.entryWord}>{entry.konkani_word}</span>
			<span class={catPageStyles.entryMeaning}>{entry.meaning[0]}</span>
			<span class={catPageStyles.entryPOS}>({entry.part_of_speech})</span>
		</a>
	</article>
{/each}
</div>