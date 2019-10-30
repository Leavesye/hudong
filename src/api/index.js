import request from '@/utils/request'
export function queryMemberInfo(nick) {
  return request({
    url: 'crmMemberInfo/queryCrmMemberInfo',
    method: 'post',
    data: {
      nick: '下夏天星星辰'
    }
  })
}

export function updateMember() {
  return request({
    url: '/crmMemberInfo/updateCrmMmber',
    method: 'post',
    data: {
      nick: '下夏天星星辰'
    }
  })
}
export function queryProvince() {
  return request({
    url: 'crmMemberInfo/getProvince',
    method: 'post',
  })
}
export function queryCity(code) {
  return request({
    url: 'crmMemberInfo/getCity',
    method: 'post',
    data: {
      provinceCode: code
    }
  })
}
export function queryArea(code) {
  return request({
    url: 'crmMemberInfo/getRegion',
    method: 'post',
    data: {
      cityCode: code
    }
  })
}
