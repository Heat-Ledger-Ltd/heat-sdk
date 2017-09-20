import resolve from "rollup-plugin-node-resolve"
import commonjs from "rollup-plugin-commonjs"
import sourceMaps from "rollup-plugin-sourcemaps"
const pkg = require("./package.json")
const camelCase = require("lodash.camelcase")
// npm install rollup-plugin-uglify --save-dev
//import uglify from 'rollup-plugin-uglify';
// npm install uglify-es --save-dev
//import { minify } from 'uglify-es';

const libraryName = "heat-sdk"

export default {
  input: `compiled/${libraryName}.js`,
  output: [
    { file: pkg.main, name: camelCase(libraryName), format: "umd" },
    { file: pkg.module, format: "es" }
  ],
  sourcemap: true,
  // Indicate here external modules you don't wanna include in your bundle (i.e.: 'lodash')
  external: [],
  watch: {
    include: "compiled/**"
  },
  plugins: [
    // Allow bundling cjs modules (unlike webpack, rollup doesn't understand cjs)
    commonjs(),
    // Allow node_modules resolution, so you can use 'external' to control
    // which external modules to include in the bundle
    // https://github.com/rollup/rollup-plugin-node-resolve#usage
    resolve(),

    // Resolve source maps to the original source
    sourceMaps(),

    // // Generate minified source bundle for use in browsers
    //uglify({}, minify)
  ]
}