const { Router } = require('express')
const router = Router()
const { history } = require('../services')

router.get('/', (req, res) => {
  const record = history.getHistory()
  res.json({
    record
  })
})

module.exports = router
