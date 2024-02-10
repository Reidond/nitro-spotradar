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
		'@nuxt/image',
	],
	runtimeConfig: {
		spotify: {
			clientId: process.env.SPOTIFY_OAUTH_CLIENT_ID,
			clientSecret: process.env.SPOTIFY_OAUTH_CLIENT_SECRET,
		},
	},
	image: {},
});
