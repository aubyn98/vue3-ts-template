import { App, DefineComponent } from 'vue'
const compReq = require.context('./', true, /.vue$/)
const c = compReq
  .keys()
  .reduce((t: { [key: string]: DefineComponent }, c: string) => {
    const name = c.match(/.*\/(.*)\.vue$/)![1]
    t[name] = compReq(c).default
    return t
  }, {})
export default {
  install(app: App) {
    Object.keys(c).forEach((key) => {
      app.component(key, c[key])
    })
  },
}
