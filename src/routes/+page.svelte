<script lang="ts">
	import Categories from '$lib/cmpnts/Categories.svelte';
	import { resolve } from '$app/paths';
	import Search from '$lib/cmpnts/Search.svelte';
</script>

<Search />

<br />
<a href={resolve('/edit')}>Create a new entry</a>
<br />
Categories:

<Categories />
