import { App } from 'vue'
import { request } from '../utils/http'
const req = require.context('./', true, /\.(js|ts)$/)
const apis = req.keys().reduce((total, apiPath) => {
  // const apiName = apiPath.match(/.*\/(.*)\.(js|ts)$/)![1]
  if (apiPath !== './index.ts') {
    return { ...total, ...req(apiPath) }
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
