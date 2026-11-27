import { error } from '@sveltejs/kit';
import { materialBySlug } from '#lib/market';
import { mergedLive } from '#lib/store';

export async function load({ params, platform }) {
	const material = materialBySlug(params.slug);
	if (!material) error(404, 'Unknown material');

	const all = await mergedLive(platform?.env as { MARKET?: any } | undefined);
	const listings = all.filter((l) => (l as any).material === material.slug);
	// A category with no live stock must not exist as an indexable page.
	if (!listings.length) error(404, 'No live listings for this material');
	return { material, listings };
}
