/**
 * 获取路由
 */
import { Router } from "./enum"
export default function(url: string) {
  const { pathname } = new URL(url)
  if(pathname.startsWith('/User')) {
    return Router.User
  } else if(pathname.startsWith('/Site')) {
    return Router.Site
  } else if(pathname.startsWith('/Page')) {
    return Router.Page
  } else if(pathname.startsWith('/Post')) {
    return Router.Post
  } else if(pathname.startsWith('/Sort')) {
    return Router.Sort
  } else {
    return Router.error
  }
}