/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: {
				primary: {
					DEFAULT: '#11853B', // Academic Green (from brand guide)
					dark: '#065E26',    // Deep Emerald
				},
				secondary: {
					DEFAULT: '#4CAF50', // Light Green
					medium: '#1B8F5A',  // from brand guide
					bg: '#E8F5E9',      // Background
				},
				accent: {
					DEFAULT: '#BFA25A', // Accent
					highlight: '#FFD700',// Highlight
				},
				surface: {
					DEFAULT: '#F7F7F2', // Ivory White
					warm: '#F4EFE1',
				},
				dark: {
					DEFAULT: '#0D1B12', // Forest Black
				}
			},
			fontFamily: {
				sans: ['"Albert Sans"', 'sans-serif'],
				serif: ['"Plus Jakarta Sans"', 'sans-serif'],
			}
		},
	},
	plugins: [],
}
