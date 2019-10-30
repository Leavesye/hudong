const getters = {
  token: state => state.user.token,
  info: state => state.user.info,
  appId: state => state.user.appId,
  signature: state => state.user.signature,
  nonceStr: state => state.user.nonceStr,
  accessToken: state => state.user.accessToken,
  openId: state => state.user.openId
}
export default getters
