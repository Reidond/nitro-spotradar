// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	devtools: { enabled: true },
	ssr: true,
	css: ['~/assets/fonts/BM/styles.css'],
	modules: [
		'@nuxt/devtools',
		'@nuxtjs/tailwindcss',
		['shadcn-nuxt', { prefix: '', componentDir: './components/ui' }],
		'@vueuse/nuxt',
		['@nuxt/image', {}],
	],
	runtimeConfig: {
		spotify: {
			//! TODO: remove sensitive data
			clientId: 'f453ecc180a349bb9a0ef39d4f925ca9',
			clientSecret: 'd0d80519e8f7497390ca25007b4abe7a',
		},
	},
});
