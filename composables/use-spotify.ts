import type { Paging } from './../types/spotify/global.d';
import type { Playlist } from './../types/spotify/playlist.d';
import { fetchWithRefresh } from './use-oauth';

export function useGetSpotifyPlaylists() {
	const key = 'spotify:current-user-playlists';

	const { refresh } = useAsyncData(key, async () => {
		const event = useRequestEvent();

		const url = new URL('https://api.spotify.com/v1/me/playlists');
		url.searchParams.append('limit', '50');

		const data = await fetchWithRefresh<Paging<Playlist>>(event!, url);

		return data;
	});

	const { data } = useNuxtData<Paging<Playlist>>(key);

	return { data, refresh };
}
