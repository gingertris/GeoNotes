/** @type {import('tailwindcss').Config} */
import { skeleton } from '@skeletonlabs/tw-plugin'
import forms from '@tailwindcss/forms';
import {join} from 'path'
export default {
  content: ['./src/**/*.{html,js,svelte,ts}', 		join(require.resolve(
			'@skeletonlabs/skeleton'),
			'../**/*.{html,js,svelte,ts}'
		)],
  theme: {
    extend: {},
  },
  plugins: [skeleton({
    themes:{preset:["wintry"]}
  }), forms],
}

