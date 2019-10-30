import axios from 'axios'
// import qs from 'qs'
import router from '../router'
import store from '../store'
// import {
//   getAccessToken
// } from '@/utils/auth.js'
// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  timeout: 30000, // 请求超时时间
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    'Content-Type': 'application/json; charset=UTF-8'
  }
})

// request拦截器
service.interceptors.request.use(config => {
  return config
}, error => {
  // Do something with request error
  console.log(error) // for debug
  Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(
  response => {
    const res = response.data
      // token 失效
    if (res.code === 401) {
      alert('token已经失效，请重新登录')
      store.dispatch('FedLogOut').then(() => {
        // location.reload() // 为了重新实例化vue-router对象 避免bug
        router.push({
          name: 'login'
        })
      })
    }
    // // 2: 接口报错
    // if (res.code === 2) {
    //   Message.error('系统错误')
    //   return Promise.reject('error')
    // }
    return response.data
  },
  error => {
    console.log('err' + error) // for debug
      // alert(error.message)
    return Promise.reject(error)
  }
)

export default service
