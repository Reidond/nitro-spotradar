import type { Paging } from './../types/spotify/global.d';
import type { Playlist } from './../types/spotify/playlist.d';
import { fetchWithRefresh } from './use-oauth';

export function useGetSpotifyPlaylists() {
	const { data } = useAsyncData(async () => {
		const event = useRequestEvent();

		const url = new URL('https://api.spotify.com/v1/me/playlists');
		url.searchParams.append('limit', '50');

		const data = await fetchWithRefresh<Paging<Playlist>>(event!, url);

		return data;
	});

	return data;
}
