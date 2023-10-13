import typescript from 'rollup-plugin-typescript2';
import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import url from '@rollup/plugin-url';
import terser from '@rollup/plugin-terser';
import external from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';

export default {
  input: 'src/index.tsx',
  output: [
    {
      file: 'dist/index.min.js',
      format: 'cjs',
      sourcemap: true,
      plugins: [terser()],
      exports: 'auto',
    },
    {
      file: 'dist/index.es.js',
      format: 'es',
      sourcemap: true,
      plugins: [terser()],
      exports: 'auto',
    },
    {
      file: 'dist/index.js',
      format: 'cjs',
      sourcemap: true,
      exports: 'auto',
    },
  ],
  plugins: [
    external(),
    postcss({
      minimize: true,
      modules: true,
      use: {
        sass: null,
        stylus: null,
        less: { javascriptEnabled: true },
      },
      extensions: ['.less'],
      extract: false,
    }),
    url(),
    nodeResolve({
      mainFields: ['module', 'main', 'jsnext:main', 'browser'],
      extensions: ['.ts', '.tsx'],
    }),
    typescript({
      clean: true,
    }),
    commonjs(),
  ],
};
