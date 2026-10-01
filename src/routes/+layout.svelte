<script lang="ts">
	import { resolve } from '$app/paths';
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
	import { globalLayoutStyles } from '$lib/styles.css.js';
	import {themeClass} from '$lib/styles.css.js';

	//import { MorphIcon } from "morphicons/svelte"; 
	//import { Menu, X } from "lucide"; // data, not components 
	// let open = $state(false);
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>
<span class={themeClass}>
<div class={globalLayoutStyles.header}>
<div>

<a href={resolve('/')}>
	<!--
<button onclick={() => (open = !open)} aria-expanded={open}>
  <MorphIcon icon={open ? X : Menu} />
</button>
-->
go home
</a>
	
</div>
</div>
<div class={globalLayoutStyles.body}>
	{@render children()}
</div>
<div class={globalLayoutStyles.footer}>
	<p>Check out the <a href="https://github.com/mk-dictionary/mk-dictionary">GitHub repository</a></p>
</div>
</span>