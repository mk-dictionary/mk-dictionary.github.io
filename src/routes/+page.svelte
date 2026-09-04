<script lang="ts">
	import Categories from '$lib/cmpnts/Categories.svelte';
	import { resolve } from '$app/paths';
	import Search from '$lib/cmpnts/Search.svelte';
	import { frontPageStyles } from '$lib/styles.css.js';
</script>

<div class={frontPageStyles.layout}>
	<Search />

	<br />
	<a class={frontPageStyles.createEntryLink} href={resolve('/edit')}>Create a new entry</a>
	<br />
	Categories:

	<Categories />
</div>
