import axios from 'axios'
import qs from 'qs'
import { ElMessage } from 'element-plus'
import { Dev, Pro } from '../config'

// 判断开发环境
const development = process.env.NODE_ENV === 'development'

// 创建实例
const http = axios.create({
  baseURL: development ? Dev.baseURL : Pro.baseURL, // 实例默认URL地址
  timeout: 2000000000, // 实例超时时间
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8', // 默认请求头
  },
})

// 实例请求拦截器
http.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 实例响应拦截器
http.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (error.message.includes('timeout')) {
      ElMessage.error('请求超时，稍后再试')
      return Promise.reject(error)
    }
    ElMessage.error('网络连接失败')
    return Promise.reject(error)
  }
)

type indexType = { [key: string]: any }
function notBoolean(val: any) {
  return typeof val !== 'boolean'
}
const methods = ['get', 'post', 'head', 'put', 'options', 'delete']
export function request(
  url: string,
  method: 'get' | 'post' | 'head' | 'put' | 'options' | 'delete',
  params: indexType | string,
  config: { headers?: indexType } = {},
  options: { isQS?: boolean | null; form?: boolean | null } = {
    isQS: true,
    form: false,
  }
) {
  if (!url) throw new Error('argument[0] missing')
  if (typeof url !== 'string')
    throw new TypeError('argument[0] must be a string')
  if (!method) throw new Error('argument[1] missing')
  if (typeof method !== 'string')
    throw new TypeError('argument[1] must be a string')
  if (methods.indexOf(method) === -1)
    throw new TypeError('argument[1], method must be ' + methods.join(' | '))
  // 判断是否为post请求
  const isPost = method.toLocaleLowerCase() === 'post'

  // 判断提交数据对应的key
  const paramsKey = isPost ? 'data' : 'params'

  // 如果没有请求头,则初始化请求头
  config.headers ||= {}

  // 是否序列化post请求的数据
  options.isQS ??= true
  if (notBoolean(options.isQS))
    throw new TypeError('options.isQS must be a [boolean or null or undefined]')
  if (options.isQS && !options.form && isPost) {
    params = qs.stringify(params)
  }

  // 判断是否为post提交表单数据
  options.form ??= false
  if (notBoolean(options.form))
    throw new TypeError('options.form must be a [boolean or null or undefined]')
  if (options.form && isPost) {
    const form = new FormData()
    Object.keys(params).forEach((key) => {
      form.append(key, (<indexType>params)[key])
    })
    params = form
    const ContentType = { 'Content-Type': 'multipart/form-data' } // 设置请求头
    Object.assign(config.headers, ContentType)
  }

  // 返回请求结果
  return http({
    url,
    method,
    [paramsKey]: params,
    ...config,
  })
    .then((res) => {
      return res.data
    })
    .catch((err) => {
      return Promise.reject(err)
    })
}
export default request
