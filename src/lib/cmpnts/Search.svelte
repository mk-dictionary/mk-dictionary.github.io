<script lang="ts">
	/* eslint-disable svelte/require-each-key */

	/* eslint-disable svelte/no-navigation-without-resolve */

	import type { FuseResult } from 'fuse.js';
	import { fuse } from '$lib/fuse';
	let results:
		| FuseResult<{ keywords: string; path: string; konkani_word: string; part_of_speech: string }>[]
		| null = $state(null);
	let searchTimer: ReturnType<typeof setTimeout> | null = $state(null);
	let search = () => {
		if (searchTimer) clearTimeout(searchTimer);
		searchTimer = setTimeout(() => {
			results = fuse.search(searchInput);
		}, 200);
	};
	let searchInput = $state('');
</script>

<input bind:value={searchInput} oninput={search} placeholder="Search..." />
{#if results && searchInput.length > 0}
	<ul>
		{#each results as result}
			<a href={result.item.path}><li>{result.item.konkani_word}</li></a>
		{/each}
	</ul>
{/if}
