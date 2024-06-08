//引用
//const express = require('express')
//const Router = express.Router
// = const { Router } = require('express')

//const express = require('express')
//const router = express.Router()
const { Router } = require('express')
//建立根路由
const router = Router()

// 處理 GET localhost:[PORT] 的請求(註：localhost:[PORT] 和 localhost:[PORT]/ 是等價的，結尾有無 / 都一樣)
// req: 前端發送來的請求物件
// res: 回傳給前端的回應物件，可以透過 send 回傳字串，或透過 json 回傳 json 格式數據。
router.get('/', (req, res) => {
  // 以字串形式返回
  res.status(200).send('This is backend of Calculator.')

  // res 的 status 設置 HTTP 回應碼，若沒設置，預設為 200
  // res.send('This is backend of Calculator.')
})


const calculator = require('./calculator')
router.use(calculator)

const history = require('./history')
router.use(history)

module.exports= router