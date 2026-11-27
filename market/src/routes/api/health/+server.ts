import { json } from '@sveltejs/kit';

// Small public health endpoint: proves which bindings the worker actually has.
export async function GET({ platform }) {
	const env = (platform?.env || {}) as Record<string, unknown>;
	return json({
		ok: true,
		market: 'oman-scrap-market',
		platform: !!platform,
		bindings: Object.keys(env).sort(),
		kv: !!env.MARKET
	});
}
