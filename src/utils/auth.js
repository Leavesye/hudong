import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'
const OPENID = 'OpenId'
const USERINFO = 'UserInfo'
export function getAccessToken () {
  return Cookies.get(TokenKey)
}
export function setAccessToken (token) {
  return Cookies.set(TokenKey, token)
}
export function removeAccessToken () {
  return Cookies.remove(TokenKey)
}

export function getOpenId () {
  return Cookies.get(OPENID)
}
export function setOpenId (openId) {
  return Cookies.set(OPENID, openId)
}
export function removeOpenId () {
  return Cookies.remove(OPENID)
}

export function getUserInfo () {
  return Cookies.get(USERINFO)
}
export function setUserInfo (info) {
  return Cookies.set(USERINFO, info)
}
export function removeUserInfo () {
  return Cookies.remove(USERINFO)
}
