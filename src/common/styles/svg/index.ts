const svgReq = require.context('.', true, /\.svg$/)
svgReq.keys().forEach(svgReq)
