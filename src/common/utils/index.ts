import { App } from 'vue'
const req = require.context('./', true, /\.(js|ts)$/)
const utils = req.keys().reduce((total, utilPath) => {
  const utilName = utilPath.match(/.*\/(.*)\.(js|ts)$/)![1]
  if (utilPath !== './index.ts') {
    return { ...total, [utilName]: req(utilPath).default }
  }
  return total
}, {})
export * from './http'
export default {
  install(app: App) {
    app.config.globalProperties.$utils = utils
    // console.log(app.config.globalProperties)
  },
  ...utils,
}
