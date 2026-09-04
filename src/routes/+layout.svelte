<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
	import { globalLayoutStyles } from '$lib/styles.css.js';
	import {themeClass} from '$lib/styles.css.js';
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>
<span class={themeClass}>
<div class={globalLayoutStyles.header}>
	<h1>MK Dictionary</h1>
</div>
<div class={globalLayoutStyles.body}>
	{@render children()}
</div>
<div class={globalLayoutStyles.footer}>
	<p>Made with ❤️</p>
</div>
</span>