const user = {
  state: {
    token: '',
    appId: '',
    nonceStr: '',
    signature: '',
    accessToken: '',
    openId: '',
    info: {}
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_INFO: (state, info) => {
      state.info = info
    },
    SET_APPID: (state, appId) => {
      state.appId = appId
    },
    SET_NONCESTR: (state, nonceStr) => {
      state.nonceStr = nonceStr
    },
    SET_SIGNATURE: (state, signature) => {
      state.signature = signature
    },
    SET_ACCESSTOKEN: (state, accessToken) => {
      state.accessToken = accessToken
    },
    SET_OPENID: (state, openId) => {
      state.openId = openId
    }
  },

  actions: {
    GetSignature({ commit }, url) {
      return new Promise((resolve, reject) => {
        getSignature(url).then(response => {
          console.log(response)
          commit('SET_APPID', response.appId)
          commit('SET_NONCESTR', response.nonceStr)
          commit('SET_SIGNATURE', response.signature)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    GetUserInfo({
      commit
    }, code) {
      return new Promise((resolve, reject) => {
        // getUserInfo(code).then(response => {
        //   commit('SET_INFO', response.wxMpUser)
        //   commit('SET_ACCESSTOKEN', response.wxMpOAuth2AccessToken.accessToken)
        //   commit('SET_OPENID', response.wxMpOAuth2AccessToken.openId)
        //   setAccessToken(response.wxMpOAuth2AccessToken.accessToken)
        //   setOpenId(response.wxMpOAuth2AccessToken.openId)
        //   setUserInfo(response.wxMpUser)
        //   resolve(response)
        // }).catch(error => {
        //   reject(error)
        // })
      })
    },
    // 前端 登出
    FedLogOut({
      commit
    }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        resolve()
      })
    }
  }
}

export default user
