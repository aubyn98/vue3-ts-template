import { App } from 'vue'
import { ElButton, ElMessage } from 'element-plus'

export default function (app: App) {
  app.config.globalProperties.$ELEMENT = { size: 'small' }
  app.use(ElButton)
  app.use(ElMessage)
}
