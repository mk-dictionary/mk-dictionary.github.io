<script lang="ts">
	/* eslint-disable svelte/require-each-key */
	import { resolve } from '$app/paths';
	import { categories } from '../../../schema/categories';
	import { catCompStyles } from '$lib/styles.css.js';
</script>

<div class={catCompStyles.categoriesGrid}>
{#each categories as category}
	<div class={catCompStyles.categoryCard}>
		<a href={resolve(`/categories/[slug]`, { slug: category })} class={catCompStyles.categoryLink}>{category}</a>
	</div>
{/each}
</div>

