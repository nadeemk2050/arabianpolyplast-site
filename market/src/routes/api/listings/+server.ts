import { json } from '@sveltejs/kit';
import { createListing, type PostInput } from '#lib/store';

export async function POST({ request, platform, getClientAddress }) {
	let body: PostInput;
	try {
		body = (await request.json()) as PostInput;
	} catch {
		return json({ ok: false, error: 'Could not read the form.' }, { status: 400 });
	}

	let ip = '';
	try {
		ip = getClientAddress();
	} catch {
		ip = request.headers.get('cf-connecting-ip') || '';
	}

	const result = await createListing(platform?.env as { MARKET?: any } | undefined, body, ip);
	return json(result, { status: result.ok ? 200 : 400 });
}
