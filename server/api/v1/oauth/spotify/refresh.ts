import { FetchError } from 'ofetch';
import { deleteOAuthCookie, setOAuthCookie, type SpotifyOAuthToken } from '~/server/utils/auth';

export default defineEventHandler(async (event) => {
	const query = getQuery(event);
	const config = useRuntimeConfig(event);

	if (!query.refresh_token) {
		throw createError({
			statusCode: 400,
			statusMessage: 'refresh_token_required',
		});
	}

	const url = new URL('https://accounts.spotify.com/api/token');
	const formData = new URLSearchParams();
	formData.append('grant_type', 'refresh_token');
	formData.append('refresh_token', query.refresh_token as string);

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

		deleteOAuthCookie(event, 'spotify');
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
