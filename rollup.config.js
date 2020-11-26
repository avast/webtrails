import svelte from 'rollup-plugin-svelte';
import resolve from 'rollup-plugin-node-resolve';
import json from '@rollup/plugin-json';
import commonjs from 'rollup-plugin-commonjs';
//import livereload from 'rollup-plugin-livereload';
import builtins from 'rollup-plugin-node-builtins';
import { terser } from 'rollup-plugin-terser';
//import { markdown } from 'svelte-preprocess-markdown';

const production = !process.env.ROLLUP_WATCH;

export default [{
	input: 'src/main.js',
	output: {
		sourcemap: true,
		format: 'iife',
		name: 'app',
		file: 'public/build/bundle.js'
	},
	onwarn: function (warning, warn) {
    if (warning.code === 'CIRCULAR_DEPENDENCY') return;
    warn(warning);
	},
	plugins: [
		svelte({
			// enable run-time checks when not in production
			dev: !production,
			// define extensions
			extensions: ['.svelte','.md'],
			// we'll extract any component CSS out into
			// a separate file  better for performance
			css: css => {
				css.write('public/build/bundle.css');
			},
			// add markdown
			//preprocess: markdown({
			//})
		}),
		builtins(),
		json({
      preferConst: true,
      compact: true,
      namedExports: true
    }),
		// If you have external dependencies installed from
		// npm, you'll most likely need these plugins. In
		// some cases you'll need additional configuration 
		// consult the documentation for details:
		// https://github.com/rollup/rollup-plugin-commonjs
		resolve({
			browser: true,
			dedupe: importee => importee === 'svelte' || importee.startsWith('svelte/')
		}),
		commonjs({
		}),

		// In dev mode, call `npm run start` once
		// the bundle has been generated
		//!production && serve(),

		// Watch the `public` directory and refresh the
		// browser on changes when not in production
		//!production && livereload('public'),

		// If we're building for production (npm run build
		// instead of npm run dev), minify
		production && terser()
	],
	watch: {
		clearScreen: false
	}
},

// workers
{
	input: 'src.ext/trends.worker.js',
	output: [{
		format: 'iife',
		name : 'trends.worker.js',
		dir: 'public.ext',
		sourcemap: true
	}],
	plugins: [
		json({
      preferConst: true,
      compact: true,
      namedExports: true
    }),
		resolve({
			mainFields: ['module', 'main'],
			preferBuiltins: true,
			//main: true,
			browser: true
		}),
		commonjs({
			ignore: ["conditional-runtime-dependency"],
			include: 'node_modules/**',
			exclude : '*.json'
		})
	],
	watch: {
		clearScreen: false
	}
},
{
	input: 'src/trends.worker.js',
	output: [{
		format: 'iife',
		name : 'trends.worker.js',
		dir: 'public/workers',
		sourcemap: true
	}],
	plugins: [
		json({
      preferConst: true,
      compact: true,
      namedExports: true
    }),
		resolve({
			mainFields: ['module', 'main'],
			preferBuiltins: true,
			//main: true,
			browser: true
		}),
		commonjs({
			ignore: ["conditional-runtime-dependency"],
			include: 'node_modules/**',
			exclude : '*.json'
		})
	],
	watch: {
		clearScreen: false
	}
},





// extension
// popup.js
{
	input: 'src.ext/index.js',
	output: {
		sourcemap: true,
		format: 'iife',
		name: 'app',
		file: 'public.ext/index.js'
	},
	onwarn: function (warning, warn) {
    if (warning.code === 'CIRCULAR_DEPENDENCY') return;
    warn(warning);
	},
	plugins: [
		svelte({
			// enable run-time checks when not in production
			dev: !production,
			// define extensions
			extensions: ['.svelte','.md'],
			// we'll extract any component CSS out into
			// a separate file  better for performance
			css: css => {
				css.write('public.ext/index.css');
			},
			// add markdown
			//preprocess: markdown({
			//})
		}),
		builtins(),
		json({
      preferConst: true,
      compact: true,
      namedExports: true
    }),
		// If you have external dependencies installed from
		// npm, you'll most likely need these plugins. In
		// some cases you'll need additional configuration 
		// consult the documentation for details:
		// https://github.com/rollup/rollup-plugin-commonjs
		resolve({
			browser: true,
			dedupe: importee => importee === 'svelte' || importee.startsWith('svelte/')
		}),
		commonjs({
		}),

		// In dev mode, call `npm run start` once
		// the bundle has been generated
		//!production && serve(),

		// Watch the `public` directory and refresh the
		// browser on changes when not in production
		//!production && livereload('public'),

		// If we're building for production (npm run build
		// instead of npm run dev), minify
		production && terser()
	],
	watch: {
		clearScreen: false
	}
},

{
	input: 'src.site.ext/popup.js',
	output: {
		sourcemap: true,
		format: 'iife',
		name: 'app',
		file: 'public.site.ext/popup.js'
	},
	onwarn: function (warning, warn) {
    if (warning.code === 'CIRCULAR_DEPENDENCY') return;
    warn(warning);
	},
	plugins: [
		svelte({
			// enable run-time checks when not in production
			dev: !production,
			// define extensions
			extensions: ['.svelte','.md'],
			// we'll extract any component CSS out into
			// a separate file  better for performance
			css: css => {
				css.write('public.site.ext/popup.css');
			},
			// add markdown
			//preprocess: markdown({
			//})
		}),
		builtins(),
		json({
      preferConst: true,
      compact: true,
      namedExports: true
    }),
		// If you have external dependencies installed from
		// npm, you'll most likely need these plugins. In
		// some cases you'll need additional configuration 
		// consult the documentation for details:
		// https://github.com/rollup/rollup-plugin-commonjs
		resolve({
			browser: true,
			dedupe: importee => importee === 'svelte' || importee.startsWith('svelte/')
		}),
		commonjs({
		}),

		// In dev mode, call `npm run start` once
		// the bundle has been generated
		//!production && serve(),

		// Watch the `public` directory and refresh the
		// browser on changes when not in production
		//!production && livereload('public'),

		// If we're building for production (npm run build
		// instead of npm run dev), minify
		production && terser()
	],
	watch: {
		clearScreen: false
	}
}


];

function serve() {
	let started = false;

	return {
		writeBundle() {
			if (!started) {
				started = true;

				require('child_process').spawn('npm', ['run', 'start', '--', '--dev'], {
					stdio: ['ignore', 'inherit', 'inherit'],
					shell: true
				});
			}
		}
	};
}
