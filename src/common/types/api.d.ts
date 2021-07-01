import { createApp } from 'vue'
import * as utils from '../utils'
declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $api: () => {}
    $utils: typeof utils
  }
}
