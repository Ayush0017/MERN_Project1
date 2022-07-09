var mongoose = require('mongoose')
var url = "mongodb://localhost:27017/meanbatch89"
mongoose.connect(url)
var db = mongoose.connection
console.log("Successfully connected to mongodb database")
module.exports = db
