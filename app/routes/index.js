var express = require('express')
var router = express.Router()

/* GET home page. */
router.get('/', function (req, res) {
  var values = []
  res.render('index', {title: 'Node Redis', values: values})
})

router.post('/redis', function (req, res) {
  var test = req.body.test

  console.log('test: ' + test)

  res.redirect('/')
})

module.exports = router
