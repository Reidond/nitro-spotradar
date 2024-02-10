import { FetchError } from 'ofetch';
import { setOAuthCookie, type SpotifyOAuthToken } from '~/server/utils/auth';

export default defineEventHandler(async (event) => {
	const query = getQuery(event);
	const reqUrl = getRequestURL(event);
	const config = useRuntimeConfig(event);

	if (!query.state) {
		throw createError({
			statusCode: 400,
			statusMessage: 'state_mismatch',
		});
	}

	if (Object.hasOwn(query, 'error') && query.error !== '') {
		throw createError({
			statusCode: 400,
			statusMessage: query.error as string,
		});
	}

	const url = new URL('https://accounts.spotify.com/api/token');
	const formData = new URLSearchParams();
	formData.append('grant_type', 'authorization_code');
	formData.append('code', query.code as string);
	formData.append('redirect_uri', reqUrl.origin + '/api/v1/oauth/spotify/callback');

	const auth = Buffer.from(`${config.spotify.clientId}:${config.spotify.clientSecret}`).toString('base64');
	try {
		const data = await $fetch<SpotifyOAuthToken>(url.toString(), {
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
				Authorization: `Basic ${auth}`,
			},
			method: 'POST',
			body: formData,
		});

		setOAuthCookie(event, 'spotify', data);
		await sendRedirect(event, '/', 302);
	} catch (e) {
		if (e instanceof FetchError) {
			if (Object.hasOwn(e.data, 'error') && e.data.error === 'invalid_grant') {
				throw createError({
					statusCode: 401,
					statusMessage: e.data.error_description,
				});
			}
		}

		throw createError({
			statusCode: 400,
			statusMessage: 'Internal server error',
		});
	}
});
