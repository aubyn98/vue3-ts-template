const scssReq = require.context('./', true, /.scss$/)
scssReq.keys().map(scssReq)
const svgReq = require.context('./svg', true, /\.svg$/)
svgReq.keys().forEach(svgReq)
