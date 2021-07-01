import { App } from 'vue'
import { request } from '../utils/http'
const req = require.context('./', true, /\.(js|ts)$/)
const apis = req.keys().reduce((total, apiPath) => {
  const apiName = apiPath.match(/.*\/(.*)\.(js|ts)$/)![1]
  if (apiName !== 'index') {
    return { ...total, ...req(apiPath).default(request) }
  }
  return total
}, {})
export default {
  install(app: App) {
    app.config.globalProperties.$api = apis
    app.config.globalProperties.$request = request
  },
  ...apis,
}
