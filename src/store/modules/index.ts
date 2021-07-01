import { Module } from 'vuex'
const files = require.context('.', false, /\.(js|ts)$/)
interface modules {
  [key: string]: Module<any, any>
}
const modules: modules = {}
files.keys().forEach((key) => {
  if (key === './index.ts' || key === './index.js') return
  modules[key.replace(/(\.\/|\.(js|ts))/g, '')] = files(key).default
})
export default modules
