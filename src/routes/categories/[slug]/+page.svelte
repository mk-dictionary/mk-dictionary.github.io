<script lang="ts">
	/* eslint-disable svelte/no-navigation-without-resolve */

	/* eslint-disable svelte/require-each-key */

	let { data } = $props();
	// svelte-ignore state_referenced_locally
	console.log(data);
	// svelte-ignore state_referenced_locally
	const words = data.words;
</script>

{#each words as entry}
	<a href={`${entry.path}`}> {entry.konkani_word} - {entry.meaning[0]} </a> ({entry.part_of_speech})

	<br />
{/each}
