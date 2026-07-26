<script lang="ts">
/* eslint-disable svelte/require-each-key */
    import {resolve} from '$app/paths'
    import { entries } from '$lib/import';
    console.log(entries);
	import Search from '$lib/cmpnts/Search.svelte';
	import { categories } from '../../schema/categories';
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p>
<Search />
<!--
    {#each searchEntries as e, i }
    <br/>
    {i}
        {JSON.stringify(e, null, 2)}
    {/each}
-->
    <br/>
    <a href={resolve('/create')}>Create a new entry</a>
    <br/>
    Categories:
    <ul>
{#each categories as category}
    <li><a href={resolve(`/categories/${category}`)}>{category}</a></li>
{/each}
</ul>

