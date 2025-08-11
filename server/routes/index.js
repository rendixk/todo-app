var express = require('express')
var router = express.Router()

/* Get home page */
router.get('/', function (req, res, next) {
  res.status(200).send('Hello World')
})

module.exports = router