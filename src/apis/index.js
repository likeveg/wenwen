import http from '@/http'
/**
 * notes
 * @module excuteApis 访问后台接口统一封装
 * @param requestParams 请求参数(必选)，JSON格式。形如 {id: 1, other: '123'} 无请求参数时，填null
 * @param  mod 后台服务模块标识(必选)，在constant.js 文件中配置。原则是一个服务一个模块，其为请求后台时url组成部分
 * @param submod 功能模块名称(必选)，在constant.js文件中配置。可对应后台controller组件名字，其为请求后台时url组成部分
 * @param todo 方法名称(必选)，在constant.js文件中配置。对应后台的方法名，其为请求后台时url组成部分
 * @return 后台返回的数据
 * @usage examples:
 * 请求后台查询合作农户档案
 * 在功能页面引入 import { excuteApis } from '@/apis'
 * 代码部分执行 excuteApis(requestParams, global.constant.archivesApis, 'peasant', 'query').then(...) 即可
 * create by cqh 2018.9.11 v1.0.0
 * */
const METHOD = {
  'GET': 1,
  'POST': 2,
  'PUT': 3,
  'DELETE': 4
}
export function excuteApis(requestParams, mod, submod, todo) {
  requestParams = requestParams || {}
  const httpEntity = Object.assign({
      url: mod.baseUrl + submod + mod[submod][todo].url,
      method: mod[submod][todo].method,
      headers: mod[submod][todo].method === 'get' ? {
        'Content-Type': 'application/x-www-form-urlencoded'
      } : {
        'Content-Type': 'application/json'
      }
    },
    mod[submod][todo].method === 'get' ? {
      params: appendParams(requestParams, mod[submod][todo].method)
    } : {
      data: appendParams(requestParams, mod[submod][todo].method)
    })
  return http(httpEntity)
}

function appendParams(requestParams, method) {
  let mod = method.toUpperCase()
  let extrasParams = null
  // let user = global.helper.ls.get('user')
  // let extrasParams = user ? Object.assign({}, {
  //   orgid: user.loginorgid ? user.loginorgid : '',
  //   loginorgid: user.loginorgid ? user.loginorgid : '',
  //   operateid: user.id ? user.id : '',
  //   loginerid: user.supportid ? user.supportid : '',
  //   operateredittime: user.operateredittime ? user.operateredittime : ''
  // }) : null
  let keys = Object.keys(requestParams || {})
  let isNoNeed = keys.filter(key => {
    return key.indexOf('isNoNeed') === 0
  })
  let params = null
  switch (METHOD[mod]) {
    case 1:
      params = new URLSearchParams()
      let curGetParams = extrasParams ? Object.assign(isNoNeed.length > 0 ? {} : extrasParams, requestParams) : requestParams
      let pp = deleteKeyOfObject(curGetParams, 'isNoNeed')
      for (let p in pp) {
        params.append(p, pp[p])
      }
      break
    case 2:
      params = extrasParams ? Object.assign(isNoNeed.length > 0 ? {} : extrasParams, requestParams) : requestParams
      params = deleteKeyOfObject(params, 'isNoNeed')
      break
    case 3:
      break
    case 4:
      break
    default:
      params = requestParams
      params = deleteKeyOfObject(params, 'isNoNeed')
  }
  return params
}

function deleteKeyOfObject(object, key) {
  delete object[key]
  return object
}
