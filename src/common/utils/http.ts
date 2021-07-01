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
export function request(
  url: string,
  method: 'get' | 'post',
  params: indexType | string,
  config: { headers?: indexType } = {},
  options: { isQS?: boolean; form?: boolean } = { isQS: true }
) {
  // 判断是否为post请求
  const isPost = method.toLocaleLowerCase() === 'post'

  // 判断提交数据对应的key
  const paramsKey = isPost ? 'data' : 'params'

  // 是否序列化post请求的数据
  if (options.isQS && isPost) {
    params = qs.stringify(params)
  }

  // 判断是否为post提交表单数据
  if (options.form && isPost) {
    const form = new FormData()
    Object.keys(params).forEach((key) => {
      form.append(key, (<indexType>params)[key])
    })
    params = form
    const ContentType = { 'Content-Type': 'multipart/form-data' } // 设置请求头
    config.headers
      ? Object.assign(config.headers, ContentType)
      : (config.headers = ContentType)
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
