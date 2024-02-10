import { nanoid } from 'nanoid';

export default defineEventHandler(async (event) => {
	const config = useRuntimeConfig(event);
	const reqUrl = getRequestURL(event);
	const url = new URL('https://accounts.spotify.com/authorize');
	url.searchParams.append('client_id', config.spotify.clientId);
	url.searchParams.append('response_type', 'code');
	url.searchParams.append('scope', 'user-read-private user-read-email playlist-read-private');
	url.searchParams.append('state', nanoid());
	url.searchParams.append('redirect_uri', reqUrl.origin + '/api/v1/oauth/spotify/callback');
	await sendRedirect(event, url.toString(), 302);
});
