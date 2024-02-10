export default defineNuxtRouteMiddleware((to) => {
	const spotifyPlaylist = useCookie('spotify:current_playlist');

	if (to.name === 'first-setup' && spotifyPlaylist.value) {
		return abortNavigation();
	}

	if (!spotifyPlaylist.value && to.name !== 'first-setup') {
		return navigateTo('/first-setup');
	}
});
