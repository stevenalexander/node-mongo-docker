var express = require('express')
var router = express.Router()

var mongoClient = require('mongodb').MongoClient

var url = 'mongodb://mongo:27017/app'

var findValues = function (db, callback) {
  var collection = db.collection('values')

  collection.find({}).toArray(function (err, docs) {
    if (err) {
      console.log('Err: ' + err)
    }
    console.dir(docs)
    callback(docs)
  })
}

var addValue = function (db, value, callback) {
  var collection = db.collection('values')

  collection.insertOne({ test: value }, function (err, result) {
    if (err) {
      console.log('Err: ' + err)
    }
    callback(result)
  })
}

/* GET home page. */
router.get('/', function (req, res) {
  var values = []

  mongoClient.connect(url, function (err, db) {
    if (err) {
      console.log('Err: ' + err)
    } else {
      console.log('Connected correctly to server')
      findValues(db, function (docs) {
        for (var i = 0; i < docs.length; i++) {
          values.push(docs[i].test)
        }
        console.log('Found values: ' + values)
        res.render('index', {title: 'Node Redis', values: values})
      })
    }
  })
})

router.post('/redis', function (req, res) {
  var test = req.body.test

  console.log('test: ' + test)

  mongoClient.connect(url, function (err, db) {
    if (err) {
      console.log('Err: ' + err)
    } else {
      addValue(db, test, function () {
        console.log('Inserted value: ' + test)
      })
    }
  })

  res.redirect('/')
})

module.exports = router
