const scssReq = require.context('./', true, /.scss$/)
scssReq.keys().map(scssReq)
