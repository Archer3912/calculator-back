//key 跟 value 名稱相同的時候，可以直接一個名稱 const { calculator } = require('./calculator')

const {plus, minus, multiply, divide, compute } =require('./calculator')
module.exports = { plus, minus, multiply, divide, compute }



// const { calculator : calculator } = require('./calculator')
// module.exports = calculator