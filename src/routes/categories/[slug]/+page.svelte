<script lang="ts">
	import {resolve} from '$app/paths';
	/* eslint-disable svelte/require-each-key */

	let { data } = $props();
	// svelte-ignore state_referenced_locally
	const words = data.words;

	import {catPageStyles} from '$lib/styles.css.js'
</script>




<div class={catPageStyles.entryGrid}>
{#each words as entry}
		<a class={catPageStyles.entryCard} href={resolve(`/${entry.path}`)} >
	
			<div class={catPageStyles.entryWord}>{entry.konkani_word}</div>
			<div class={catPageStyles.entryMeaning}>{entry.meaning[0]}</div>
			<div class={catPageStyles.entryPOS}>({entry.part_of_speech})</div>
		</a>
{/each}
</div>