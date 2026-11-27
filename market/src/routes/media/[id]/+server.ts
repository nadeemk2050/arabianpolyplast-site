import { getMedia } from '#lib/store';

export async function GET({ params, platform, setHeaders }) {
	const media = await getMedia(platform?.env as { MARKET?: any } | undefined, params.id);
	if (!media) return new Response('Not found', { status: 404 });
	setHeaders({
		'content-type': media.type,
		'cache-control': 'public, max-age=31536000, immutable'
	});
	return new Response(media.bytes);
}
