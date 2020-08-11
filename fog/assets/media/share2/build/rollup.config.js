/*
 * @Author: your name
 * @Date: 2019-12-02 18:04:27
 * @LastEditTime : 2019-12-20 16:06:47
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /share/build/rollup.config.js
 */
const path = require('path');
const buble = require('rollup-plugin-buble');
const typescript = require('rollup-plugin-typescript2');
const less = require('rollup-plugin-less');
const resolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');

const resolveFile = function (filePath) {
	return path.join(__dirname, '..', filePath)
}

module.exports = [
	{
		input: resolveFile('src/main.ts'),
		output: {
			file: resolveFile('dist/Share.js'),
			format: 'umd',
			name: 'Share',
			sourceMap: true
		},
		plugins: [
			resolve({
				jsnext: true,
				main: true,
				customResolveOptions: {
					moduleDirectory: 'node_modules'
				}
			}),
        	commonjs({
				include: 'node_modules/**'
			}),
			less({
				insert: true,
				output: false
			}),
			typescript({
				verbosity: 3,
				tsconfigDefaults: {
					extendedDiagnostics: process.env.NODE_ENV === 'production'
				},
				useTsconfigDeclarationDir: true,
				objectHashIgnoreUnknownHack: true,
				clean: process.env.NODE_ENV === 'production',
				include: ['*.ts+(|x)', '**/*.ts+(|x)', '*.js+(|x)', '**/*.js+(|x)']
			}),
			buble(),
		],
		external: ['qrcodejs2']
	},
]