import type { H3Event } from 'h3';
import { deleteCookie, setCookie } from 'h3';

export interface SpotifyOAuthToken {
	access_token: string;
	token_type: string;
	scope: string;
	expires_in: number;
	refresh_token: string;
}

type Token = {
	access_token: string;
	refresh_token?: string;
	expires_in: number;
};
export function setOAuthCookie<T extends Token>(event: H3Event, namespace: string, data: T) {
	setCookie(event, `${namespace}:access_token`, data.access_token, {
		httpOnly: true,
		maxAge: data.expires_in,
		path: '/',
		sameSite: 'strict',
		secure: true,
	});
	if (data.refresh_token) {
		setCookie(event, `${namespace}:refresh_token`, data.refresh_token, {
			httpOnly: true,
			path: '/',
			sameSite: 'strict',
			secure: true,
		});
	}
}

export function deleteOAuthCookie(event: H3Event, namespace: string) {
	deleteCookie(event, `${namespace}:access_token`);
	deleteCookie(event, `${namespace}:refresh_token`);
}
