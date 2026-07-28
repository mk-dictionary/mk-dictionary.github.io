import adapter from '@sveltejs/adapter-static';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

// code borrowed from vite-plugin-toon, MIT license, subject to change
import { decode } from '@toon-format/toon';
/**
 * Vite plugin for importing .toon files
 * @param {Object} options - Plugin options
 * @returns {import('vite').Plugin}
 */
function toonPlugin() {
	return {
		name: 'vite-plugin-toon',
		transform(src, id) {
			if (id.endsWith('.toon')) {
				const result = decode(src);
				return {
					code: `export default ${JSON.stringify(result)};`,
					map: null
				};
			}
		}
	};
}

export default defineConfig({
	plugins: [
		sveltekit({
			compilerOptions: {
				// Force runes mode for the project, except for libraries. Can be removed in svelte 6.
				runes: ({ filename }) =>
					filename.split(/[/\\]/).includes('node_modules') ? undefined : true
			},

			// adapter-auto only supports some environments, see https://svelte.dev/docs/kit/adapter-auto for a list.
			// If your environment is not supported, or you settled on a specific environment, switch out the adapter.
			// See https://svelte.dev/docs/kit/adapters for more information about adapters.
			adapter: adapter({ strict: false })
		}),
		toonPlugin()
	],
	server: {
		fs: {
			allow: ['..']
		}
	}
});
