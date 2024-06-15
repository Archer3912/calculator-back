class History{
  constructor(){
    this.history = []
  }

  store(formula,answer){
    this.history.push({
      formula: formula, answer: answer
    })
  }
  
  getHistory(){
    return this.history
  }
}

const history = new History()

module.exports = history