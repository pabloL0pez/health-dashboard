import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import { readFileSync } from 'fs';
import dts from 'rollup-plugin-dts';

const pkg = JSON.parse(readFileSync(new URL('./package.json', import.meta.url), 'utf8'));

const assetFileNames = 'assets/css/[hash][extname]';

export default [
	{
		input: 'src/index.ts',
		output: [
			{
				file: pkg.main,
				format: 'cjs',
				interop: 'auto',
				sourcemap: true,
				assetFileNames,
			},
			{
				file: pkg.module,
				format: 'esm',
				interop: 'auto',
				sourcemap: true,
				assetFileNames,
			},
		],
		plugins: [
			resolve(),
			commonjs(),
			typescript({ tsconfig: './tsconfig.json' }),
		],
		external: ['mongoose'],
	},
	{
		input: 'dist/esm/dist/index.d.ts',
		output: [
			{
				file: 'dist/index.d.ts',
				format: 'esm'
			},
		],
		plugins: [
			dts({
				compilerOptions: {
					baseUrl: 'src',
				},
			}),
		],
	},
];