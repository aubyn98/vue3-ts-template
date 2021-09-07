import { App } from 'vue'
import apis from 'apis'
import comp from 'comp'
export default function (app: App) {
  const plugins = require.context('./', true, /\.(js|ts)$/)
  plugins.keys().forEach(pluginPath => {
    // const pluginName = pluginPath.match(/.*\/(.*)\.(js|ts)$/)![1]
    if (pluginPath !== './index.ts') {
      plugins(pluginPath).default(app)
    }
  })
  app.use(apis).use(comp)
}
