import { getCookie, setCookie, type EventHandlerRequest, type H3Event } from 'h3';
import { type FetchError } from 'ofetch';

export function setupRequestEventCookies() {
	const event = useRequestEvent();
	const accessToken = getCookie(event!, 'spotify:access_token');
	const refreshToken = getCookie(event!, 'spotify:refresh_token');

	return { accessToken, refreshToken };
}

export async function fetchWithRefresh<T>(event: H3Event<EventHandlerRequest>, url: URL) {
	const { accessToken, refreshToken } = setupRequestEventCookies();

	try {
		return await $fetch<T>(url.toString(), {
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		});
	} catch (error) {
		if ((error as FetchError).response?.status === 401) {
			const { access_token, expires_in } = await $fetch('/api/v1/oauth/spotify/refresh', {
				query: {
					refresh_token: refreshToken,
				},
			});

			setCookie(event, `spotify:access_token`, access_token, {
				httpOnly: true,
				maxAge: expires_in,
				path: '/',
				sameSite: 'strict',
				secure: true,
			});

			return await $fetch<T>(url.toString(), {
				headers: {
					Authorization: `Bearer ${access_token}`,
				},
			});
		}

		throw error;
	}
}
