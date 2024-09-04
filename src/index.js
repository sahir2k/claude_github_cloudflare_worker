export default {
	async fetch(request, env) {
		const url = new URL(request.url);

		if (request.method === 'OPTIONS') {
			return new Response(null, {
				headers: {
					'Access-Control-Allow-Origin': '*',
					'Access-Control-Allow-Methods': 'GET, POST',
					'Access-Control-Allow-Headers': 'Content-Type, Authorization',
				},
			});
		}

		if (url.pathname === '/exchange') {
			if (request.method !== 'POST') {
				return new Response('Method Not Allowed', { status: 405 });
			}

			const { code } = await request.json();

			const response = await fetch('https://github.com/login/oauth/access_token', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
				},
				body: JSON.stringify({
					client_id: env.GITHUB_CLIENT_ID,
					client_secret: env.GITHUB_CLIENT_SECRET,
					code,
					redirect_uri: 'https://<extension-id>.chromiumapp.org/',
				}),
			});

			const data = await response.json();

			return new Response(JSON.stringify(data), {
				headers: {
					'Content-Type': 'application/json',
					'Access-Control-Allow-Origin': '*',
				},
			});
		} else if (url.pathname === '/download') {
			if (request.method !== 'GET') {
				return new Response('Method Not Allowed', { status: 405 });
			}

			const fileUrl = url.searchParams.get('url');
			const token = request.headers.get('Authorization').split(' ')[1];

			if (!fileUrl || !token) {
				return new Response('Missing file URL or token', { status: 400 });
			}

			const fileResponse = await fetch(fileUrl, {
				headers: {
					Authorization: `token ${token}`,
				},
			});

			return new Response(fileResponse.body, {
				headers: {
					'Content-Type': fileResponse.headers.get('Content-Type'),
					'Content-Disposition': fileResponse.headers.get('Content-Disposition'),
					'Access-Control-Allow-Origin': '*',
				},
			});
		}

		return new Response('Not Found', { status: 404 });
	},
};
