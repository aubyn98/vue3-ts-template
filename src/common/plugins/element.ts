import { App } from 'vue'
import { ElButton, ElMessage } from 'element-plus'
import 'element-plus/packages/theme-chalk/src/base.scss'
export default function (app: App) {
  app.config.globalProperties.$ELEMENT = { size: 'small' }
  app.use(ElButton)
  app.use(ElMessage)
}
