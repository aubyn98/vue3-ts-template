const mixins = require.context('./', true, /.(js|ts)$/)
export default mixins.keys().reduce((t: { [key: string]: any }, path) => {
  const name = path.match(/.*\/(.*)\.(js|ts)$/)![1]
  if (path !== './index.ts') {
    t[name] = mixins(path).default
  }
  return t
}, {})
