import { getParam } from '../url'

const setCookieFromParam = pname => {
  let param = getParam(pname)

  if (param) {
    document.cookie = `${pname}=${param}`
    return
  }

  return null
}

const getCookie = name => {
  return document.cookie.split('; ').reduce((r, v) => {
    const parts = v.split('=')
    return parts[0] === name ? decodeURIComponent(parts[1]) : r
  }, null)
}

export { setCookieFromParam, getCookie }
