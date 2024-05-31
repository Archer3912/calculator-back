const { typeOf } = require("mathjs");

function plus(v1,v2){
  return v1 + v2;
}

function minus(v1, v2) {
  return v1 - v2;
}

function multiply(v1, v2) {
  return v1 * v2
}

function divide(v1, v2) {
  // 小數點後保留位數
  let around = 5
  if (v2 === 0) {
    return '分母不得為0'
  } else {
    return (v1 / v2).toFixed(around)
  }
}

//把式子做拆分，讓數字跟運算符號變成字串
function splitEquation(equation){
  let currentNumber = '';
  let result = [];
  for (let opera of equation){
    if (opera === '+' || opera === '-' || opera === '*' || opera === '/'){
      //遇到運算符號的話，將當下的數字推到陣列裡面，並清空當下數字
      if(currentNumber !== ''){
        result.push(currentNumber);
        currentNumber = '';
      }
      //將運算符號推進陣列
      result.push(opera);
    }else {
      //如果是數字，將他加進當下的數字
      currentNumber += opera
    }
  }
  if(currentNumber !== ''){
    result.push(currentNumber)
  }
  return result;
}

//先處理乘法跟除法
function calculatorMultiplicationAndDivide(equation){
  let result = [];
  let i = 0;
  while (i < equation.length){
    if (equation[i] === '*'){
      let previous = result.pop();
      let next = equation[++i];
      result.push(Number(previous) * Number(next));
    } else if (equation[i] === '/'){
      let previous = result.pop()
      let next = equation[++i]
      result.push(Number(previous) / Number(next))
    } else {
      result.push(equation[i]);
    }
    i++;
  }
  return result
}

//再來處理加法跟減法
function calculatorPlusAndMinus(equation) {
  let result = 0
  let currentNumber = ''
  let operator = '+'
  console.log('equation', equation)
  console.log(typeof equation)
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
function compute(value) {
  let splitequation = splitEquation(value)
  let multiplicationAndDivide = calculatorMultiplicationAndDivide(splitequation)
  let plusAndMinus = calculatorPlusAndMinus(multiplicationAndDivide)
  return plusAndMinus
}




module.exports = {
  plus,
  minus,
  multiply,
  divide,
  compute
}

//module.exports = { calculator: { plus, minus, multiply, divide, compute } }