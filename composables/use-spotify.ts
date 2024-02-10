import { getCookie } from 'h3';
import type { Paging } from './../types/spotify/global.d';
import type { Playlist } from './../types/spotify/playlist.d';

function setupRequestEventCookies() {
	const event = useRequestEvent();
	const accessToken = getCookie(event!, 'spotify:access_token');
	const refreshToken = getCookie(event!, 'spotify:refresh_token');

	return { accessToken, refreshToken };
}

export function useGetSpotifyPlaylists() {
	const { data } = useAsyncData(async () => {
		const { accessToken } = setupRequestEventCookies();

		const url = new URL('https://api.spotify.com/v1/me/playlists');
		url.searchParams.append('limit', '50');

		const data = await $fetch<Paging<Playlist>>(url.toString(), {
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		});

		return data;
	});

	return data;
}
