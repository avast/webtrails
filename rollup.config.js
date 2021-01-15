import svelte from 'rollup-plugin-svelte';
import resolve from 'rollup-plugin-node-resolve';
import json from '@rollup/plugin-json';
import commonjs from 'rollup-plugin-commonjs';
import builtins from 'rollup-plugin-node-builtins';
import { terser } from 'rollup-plugin-terser';

const production = !process.env.ROLLUP_WATCH;

export default [


        // workers
        {
            input: 'src/trends.worker.js',
            output: [{
                format: 'iife',
                name: 'trends.worker.js',
                dir: 'build/workers',
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
                    browser: true
                }),
                commonjs({
                    ignore: ["conditional-runtime-dependency"],
                    include: 'node_modules/**',
                    exclude: '*.json'
                })
            ],
            watch: {
                clearScreen: false
            }
        },





        // extension
        // popup.js
        {
            input: 'src/index.js',
            output: {
                sourcemap: true,
                format: 'iife',
                name: 'app',
                file: 'build/index.js'
            },
            onwarn: function(warning, warn) {
                if (warning.code === 'CIRCULAR_DEPENDENCY') return;
                warn(warning);
            },
            plugins: [
                svelte({
                    // enable run-time checks when not in production
                    dev: !production,
                    // define extensions
                    extensions: ['.svelte', '.md'],
                    // we'll extract any component CSS out into
                    // a separate file  better for performance
                    css: css => {
                        css.write('index.css');
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
                commonjs({}),

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