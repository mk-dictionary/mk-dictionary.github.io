<script lang="ts">
	/* eslint-disable svelte/require-each-key */

	/* eslint-disable svelte/no-navigation-without-resolve */
	import { searchCompStyles } from '$lib/styles.css.js';

	import type { FuseResult } from 'fuse.js';
	import { fuse } from '$lib/fuse';
	let results:
		| FuseResult<{
				keywords: string;
				path: string;
				konkani_word: string;
				meaning: string;
				part_of_speech: string;
		  }>[]
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

<div class={searchCompStyles.searchContainer}>
	<input bind:value={searchInput} oninput={search} placeholder="Search..." />
</div>
{#if results && searchInput.length > 0}
	<div class={searchCompStyles.searchResults}>
		{#each results as result}
			<div class={searchCompStyles.searchResultContainer}>
				<a href={result.item.path} class={searchCompStyles.searchResultLink}>
					<span class={searchCompStyles.searchResultWord}>{result.item.konkani_word}</span>
				</a>
			</div>
		{/each}
	</div>
{/if}
