// 引用後端框架 express
const express = require('express')
const cors = require('cors')
const math = require('mathjs')

// 建立 express 實例
const app = express()

// 使用 cors 中間件，允許不同網域來的請求，免於同源策略的限制
app.use(cors())

// 設置監聽的 port (後端 URL 會是 localhost:[PORT])
const PORT = 3000

//連續計算
function continuousCalculation(value) {
  //先處理乘法跟除法
  function calculatorMultiplicationAndDivide(equation) {
    return equation.replace(
      /(\d+\.?\d*)([\/*])(\d+\.?\d*)/g,
      function (match, num1, operator, num2) {
        if (operator === '*') {
          return Number(num1) * Number(num2)
        } else if (operator === '/') {
          return Number(num1) / Number(num2)
        }
      }
    )
  }

  //再來處理加法跟減法
  function calculatorPlusAndMinus(equation) {
    let result = 0
    let currentNumber = ''
    let operator = '+'

    for (let opera of equation) {
      if (opera === '+' || opera === '-') {
        result =
          operator === '+'
            ? result + Number(currentNumber)
            : result - Number(currentNumber)
        currentNumber = ''
        operator = opera
      } else {
        currentNumber += opera
      }
    }
    result =
      operator === '+'
        ? result + Number(currentNumber)
        : result - Number(currentNumber)
    return result
  }

  let multiplicationAndDivide = calculatorMultiplicationAndDivide(value)
  let plusAndMinus = calculatorPlusAndMinus(multiplicationAndDivide)
  return plusAndMinus
}

// 處理 GET localhost:[PORT] 的請求(註：localhost:[PORT] 和 localhost:[PORT]/ 是等價的，結尾有無 / 都一樣)
// req: 前端發送來的請求物件
// res: 回傳給前端的回應物件，可以透過 send 回傳字串，或透過 json 回傳 json 格式數據。
app.get('/', (req, res) => {
  // 以字串形式返回
  res.status(200).send('This is backend of Calculator.')

  // res 的 status 設置 HTTP 回應碼，若沒設置，預設為 200
  // res.send('This is backend of Calculator.')
})

// 處理 GET localhost:[PORT]/plus?v1=xxx&v2=xxx 的請求
// ex:
// request: /plus?v1=3&v2=7
// response: { answer: 10 }
app.get('/plus', (req, res) => {
  const QUERY = req.query
  // v1 和 v2 必須為數字，目前尚未處理非數字的情況
  const v1 = Number(QUERY.v1)
  const v2 = Number(QUERY.v2)
  res.json({
    answer: v1 + v2
  })
})

// 處理 GET localhost:[PORT]/minus?v1=xxx&v2=xxx 的請求
// ex:
// request: /minus?v1=3&v2=7
// response: { answer: -4 }
app.get('/minus', (req, res) => {
  const QUERY = req.query
  const v1 = Number(QUERY.v1)
  const v2 = Number(QUERY.v2)
  res.json({
    answer: v1 - v2
  })
})

// 處理 GET localhost:[PORT]/multiply?v1=xxx&v2=xxx 的請求
// ex:
// request: /multiply?v1=3&v2=7
// response: { answer: 21 }
app.get('/multiply', (req, res) => {
  const QUERY = req.query
  const v1 = Number(QUERY.v1)
  const v2 = Number(QUERY.v2)
  res.json({
    answer: v1 * v2
  })
})

// 處理 GET localhost:[PORT]/divide?v1=xxx&v2=xxx 的請求
// ex:
// request: /divide?v1=3&v2=7
// response: { answer: 0.42857 }
app.get('/divide', (req, res) => {
  const QUERY = req.query
  const v1 = Number(QUERY.v1)
  const v2 = Number(QUERY.v2)
  // 小數點後保留位數
  let around = 5
  if (Number(QUERY.ROUND) !== null) {
    around = Number(QUERY.ROUND)
  }
  // 預設只保留小數點後 ROUND 位
  const answer = Number((v1 / v2).toFixed(around))
  res.json({
    answer
  })
})

//處理 GET localhost:[PORT]/continuous?value=xxxx    連續加減乘除的請求
app.get('/continuous', (req, res) => {
  const QUERY = req.query
  const value = QUERY.value
  const newValue = value.split(' ').join('')
  console.log(newValue)
  const answer = math.evaluate(newValue)
  res.json({
    answer
  })
})

//處理 GET localhost:[PORT]/arithmetic?value=xxxx     連續加減乘除的請求
app.get('/arithmetic', (req, res) => {
  const QUERY = req.query
  const value = QUERY.value
  const newValue = value.split(' ').join('')
  console.log(newValue)
  const answer = continuousCalculation(newValue)
  res.json({
    answer
  })
})

app.listen(PORT, () => {
  console.log(`express server is running on http://localhost:${PORT}`)
})
