// 引用後端框架 express
const express = require('express');
const cors = require('cors');
const math = require('mathjs');
//路由們，底下可以包含多個路由器設定，這邊引用路由設定檔，沒有指定檔案預設就是./routes/index.js
const router = require('./routes');

// 建立 express 實例
const app = express()

// 使用 cors 中間件，允許不同網域來的請求，免於同源策略的限制
app.use(cors())

//使用路由設定
app.use(router);

// 處理 GET localhost:[PORT] 的請求(註：localhost:[PORT] 和 localhost:[PORT]/ 是等價的，結尾有無 / 都一樣)
// req: 前端發送來的請求物件
// res: 回傳給前端的回應物件，可以透過 send 回傳字串，或透過 json 回傳 json 格式數據。
app.get('/', (req, res) => {
  // 以字串形式返回
  // res 的 status 設置 HTTP 回應碼，若沒設置，預設為 200
  // res.send('This is backend of Calculator.')
})

// 設置監聽的 port (後端 URL 會是 localhost:[PORT])
const PORT = 3000





app.listen(PORT, () => {
  console.log(`express server is running on http://localhost:${PORT}`)
})
