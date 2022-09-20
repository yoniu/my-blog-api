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
	BLOG: KVNamespace,
	//
	// Example binding to Durable Object. Learn more at https://developers.cloudflare.com/workers/runtime-apis/durable-objects/
	// MY_DURABLE_OBJECT: DurableObjectNamespace;
	//
	// Example binding to R2. Learn more at https://developers.cloudflare.com/workers/runtime-apis/r2/
	// MY_BUCKET: R2Bucket;
}
//declare const TESTING: KVNamespace
import { checkOrigins } from "./origin"
import routerCheck from "./router"
import { Router, Status } from "./enum"
import { returnType, myMetadata } from "./interface"
export default {
	async fetch(
		request: Request,
		env: Env,
		ctx: ExecutionContext
	): Promise<Response> {

		let returnData
		switch(routerCheck(request.url)) {
			case Router.User:
				await env.BLOG.put('text', '', {
					metadata: <myMetadata>{
						date: new Date().getTime(),
						title: 'testing',
						content: '<p>测试中文</p><p style="color: blue">蓝色字体</p><p style="color: red">红色字体</p>'
					}
				})
				const { metadata } = <{metadata: myMetadata}>await env.BLOG.getWithMetadata('text')
				returnData = new Response(JSON.stringify(<returnType>{
					status: Status.success,
					message: metadata.content
				}))
				break;
			case Router.error:
			default:
				returnData = new Response(JSON.stringify(<returnType>{
					status: Status.success,
					message: 'hello, this api public in https://github.com/yoniu/my-blog-api'
				}), {
					headers: {
						'content-type': 'application/json;charset=UTF-8',
					}
				})
		}
		return returnData
	},
};
