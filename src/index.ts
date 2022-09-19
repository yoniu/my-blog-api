/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `wrangler dev src/index.ts` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `wrangler publish src/index.ts --name my-worker` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

export interface Env {
	// Example binding to KV. Learn more at https://developers.cloudflare.com/workers/runtime-apis/kv/
	// MY_KV_NAMESPACE: KVNamespace;
	//
	// Example binding to Durable Object. Learn more at https://developers.cloudflare.com/workers/runtime-apis/durable-objects/
	// MY_DURABLE_OBJECT: DurableObjectNamespace;
	//
	// Example binding to R2. Learn more at https://developers.cloudflare.com/workers/runtime-apis/r2/
	// MY_BUCKET: R2Bucket;
}
import { ORIGINS } from "./origin";
export default {
	async fetch(
		request: Request,
		env: Env,
		ctx: ExecutionContext
	): Promise<Response> {
		let data
		
		const url = new URL(request.headers.get('Origin') as string)
		if (ORIGINS.includes(url.hostname))
			data = '来源正确'
		else
			data = '来源不明'
		return new Response(JSON.stringify({
			title: "Hello World!",
			text: data
		}), {
			headers: {
        'content-type': 'application/json;charset=UTF-8',
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Methods': 'GET,HEAD,POST,OPTIONS',
				'Access-Control-Max-Age': '86400',
			}
		});
	},
};
