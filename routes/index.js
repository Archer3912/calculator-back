const { plus, minus, multiply, divide, compute } = require('../services')
const {Router} = require('express')
const router =  Router()


// 處理 GET localhost:[PORT] 的請求(註：localhost:[PORT] 和 localhost:[PORT]/ 是等價的，結尾有無 / 都一樣)
// req: 前端發送來的請求物件
// res: 回傳給前端的回應物件，可以透過 send 回傳字串，或透過 json 回傳 json 格式數據。
router.get('/', (req, res) => {
  // 以字串形式返回
  res.status(200).send('This is backend of Calculator.')

  // res 的 status 設置 HTTP 回應碼，若沒設置，預設為 200
  // res.send('This is backend of Calculator.')
})

// 處理 GET localhost:[PORT]/plus?v1=xxx&v2=xxx 的請求
// ex:
// request: /plus?v1=3&v2=7
// response: { answer: 10 }
router.get('/plus', (req, res) => {
  const QUERY = req.query
  // v1 和 v2 必須為數字，目前尚未處理非數字的情況
  const v1 = Number(QUERY.v1)
  const v2 = Number(QUERY.v2)
  const answer = plus(v1,v2)
  res.json({
    answer
  })
})

// 處理 GET localhost:[PORT]/minus?v1=xxx&v2=xxx 的請求
// ex:
// request: /minus?v1=3&v2=7
// response: { answer: -4 }
router.get('/minus', (req, res) => {
  const QUERY = req.query
  const v1 = Number(QUERY.v1)
  const v2 = Number(QUERY.v2)
  const answer = minus(v1,v2)
  res.json({
    answer
  })
})

// 處理 GET localhost:[PORT]/multiply?v1=xxx&v2=xxx 的請求
// ex:
// request: /multiply?v1=3&v2=7
// response: { answer: 21 }
router.get('/multiply', (req, res) => {
  const QUERY = req.query
  const v1 = Number(QUERY.v1)
  const v2 = Number(QUERY.v2)
  const answer = multiply(v1, v2)
  res.json({
    answer
  })
})

// 處理 GET localhost:[PORT]/divide?v1=xxx&v2=xxx 的請求
// ex:
// request: /divide?v1=3&v2=7
// response: { answer: 0.42857 }
router.get('/divide', (req, res) => {
  const QUERY = req.query
  const v1 = Number(QUERY.v1)
  const v2 = Number(QUERY.v2)
  const answer = divide(v1, v2)
  res.json({
    answer
  })
})

//處理 GET localhost:[PORT]/continuous?value=xxxx    連續加減乘除的請求
// router.get('/continuous', (req, res) => {
//   const QUERY = req.query
//   const value = QUERY.value
//   const newValue = value.split(' ').join('')
//   console.log(newValue)
//   const answer = math.evaluate(newValue)
//   res.json({
//     answer
//   })
// })

//處理 GET localhost:[PORT]/compute?value=xxxx     連續加減乘除的請求
router.get('/compute', (req, res) => {
  const QUERY = req.query
  const value = QUERY.value
  const newValue = value.split(' ').join('')
  const answer = compute(newValue)
  res.json({
    answer
  })
})

module.exports = router
