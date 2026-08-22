<script lang="ts">
	import Categories from '$lib/cmpnts/Categories.svelte';
	/* eslint-disable svelte/require-each-key */
	import { resolve } from '$app/paths';
	import { entries } from '$lib/import';
	console.log(entries);
	import Search from '$lib/cmpnts/Search.svelte';
</script>

<Search />
<!--
    {#each searchEntries as e, i }
    <br/>
    {i}
        {JSON.stringify(e, null, 2)}
    {/each}
-->
<br />
<a href={resolve('/edit')}>Create a new entry</a>
<br />
Categories:

<Categories />
