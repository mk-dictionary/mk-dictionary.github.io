<script lang="ts">
	/* eslint-disable svelte/require-each-key */
	import { resolve } from '$app/paths';
	import { categories } from '../../../schema/categories';
</script>

<div class="categories-grid">
{#each categories as category}
	<div class="category-card">
		<a href={resolve(`/categories/[slug]`, { slug: category })} class="category-link">{category}</a>
	</div>
{/each}
</div>

