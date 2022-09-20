/**
 * 检查来源域名，防止跨域或不安全请求
 */
export const ORIGINS = ['blog.200011.net', '127.0.0.1']
export const checkOrigins = function(headers: Headers) {
  if(headers.get('Origin')) {
    const url = new URL(headers.get('Origin') as string)
		if (ORIGINS.includes(url.hostname))
			return true
		else
			return false
  }
}