const history = require('./history')

class Calculator {
  constructor(round = 5) {
    this.round = round
  }

  changRound(newRound) {
    this.round = newRound
  }

  plus(v1, v2) {
    return v1 + v2
  }

  minus(v1, v2) {
    return v1 - v2
  }

  multiply(v1, v2) {
    return v1 * v2
  }

  divide(v1, v2) {
    if (v2 === 0) {
      return '分母不得為0'
    } else {
      return (v1 / v2).toFixed(this.round)
    }
  }
  //把式子做拆分，讓數字跟運算符號變成字串
  splitEquation(equation) {
    let currentNumber = ''
    let result = []
    for (let opera of equation) {
      if (opera === '+' || opera === '-' || opera === '*' || opera === '/') {
        //遇到運算符號的話，將當下的數字推到陣列裡面，並清空當下數字
        if (currentNumber !== '') {
          result.push(currentNumber)
          currentNumber = ''
        }
        //將運算符號推進陣列
        result.push(opera)
      } else {
        //如果是數字，將他加進當下的數字
        currentNumber += opera
      }
    }
    if (currentNumber !== '') {
      result.push(currentNumber)
    }
    return result
  }

  //先處理乘法跟除法
  calculatorMultiplicationAndDivide(equation) {
    let result = []
    let i = 0
    while (i < equation.length) {
      if (equation[i] === '*') {
        //從result拿出上一個數字
        let previous = result.pop()
        //拿到下一個數字的同時把i+1
        let next = equation[++i]
        //計算結果，並把結果丟回result
        result.push(Number(previous) * Number(next))
      } else if (equation[i] === '/') {
        let previous = result.pop()
        let next = equation[++i]
        result.push(Number(previous) / Number(next))
      } else {
        result.push(equation[i])
      }
      i++
    }
    return result
  }

  //再來處理加法跟減法
  calculatorPlusAndMinus(equation) {
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

  // 完整的計算函數
  compute(value) {
    let splitequation = this.splitEquation(value)
    let multiplicationAndDivide =
      this.calculatorMultiplicationAndDivide(splitequation)
    let plusAndMinus = this.calculatorPlusAndMinus(multiplicationAndDivide)
    history.store(value, plusAndMinus)
    return plusAndMinus
  }
}

calculator = new Calculator()

// 使用class只要把名稱丟進去就可以
module.exports = calculator

// function plus(v1, v2) {
//   return v1 + v2
// }

// function minus(v1, v2) {
//   return v1 - v2
// }

// function multiply(v1, v2) {
//   return v1 * v2
// }

// function divide(v1, v2) {
//   // 小數點後保留位數
//   let around = 5
//   if (v2 === 0) {
//     return '分母不得為0'
//   } else {
//     return (v1 / v2).toFixed(around)
//   }
// }

// //把式子做拆分，讓數字跟運算符號變成字串
// function splitEquation(equation) {
//   let currentNumber = ''
//   let result = []
//   for (let opera of equation) {
//     if (opera === '+' || opera === '-' || opera === '*' || opera === '/') {
//       //遇到運算符號的話，將當下的數字推到陣列裡面，並清空當下數字
//       if (currentNumber !== '') {
//         result.push(currentNumber)
//         currentNumber = ''
//       }
//       //將運算符號推進陣列
//       result.push(opera)
//     } else {
//       //如果是數字，將他加進當下的數字
//       currentNumber += opera
//     }
//   }
//   if (currentNumber !== '') {
//     result.push(currentNumber)
//   }
//   return result
// }

// //先處理乘法跟除法
// function calculatorMultiplicationAndDivide(equation) {
//   let result = []
//   let i = 0
//   while (i < equation.length) {
//     if (equation[i] === '*') {
//       let previous = result.pop()
//       let next = equation[++i]
//       result.push(Number(previous) * Number(next))
//     } else if (equation[i] === '/') {
//       let previous = result.pop()
//       let next = equation[++i]
//       result.push(Number(previous) / Number(next))
//     } else {
//       result.push(equation[i])
//     }
//     i++
//   }
//   return result
// }

// //再來處理加法跟減法
// function calculatorPlusAndMinus(equation) {
//   let result = 0
//   let currentNumber = ''
//   let operator = '+'
//   for (let opera of equation) {
//     if (opera === '+' || opera === '-') {
//       result =
//         operator === '+'
//           ? result + Number(currentNumber)
//           : result - Number(currentNumber)
//       currentNumber = ''
//       operator = opera
//     } else {
//       currentNumber += opera
//     }
//   }
//   result =
//     operator === '+'
//       ? result + Number(currentNumber)
//       : result - Number(currentNumber)
//   return result
// }

// // 完整的計算函數
// function compute(value) {
//   let splitequation = splitEquation(value)
//   let multiplicationAndDivide = calculatorMultiplicationAndDivide(splitequation)
//   let plusAndMinus = calculatorPlusAndMinus(multiplicationAndDivide)
//   return plusAndMinus
// }
// 如果是function 要把每個函式丟進去
// module.exports = {
//   plus,
//   minus,
//   multiply,
//   divide,
//   compute
// }

//module.exports = { calculator: { plus, minus, multiply, divide, compute } }
