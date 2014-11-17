var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/projectlist', function () {
  console.log('mongodb connected')
})
module.exports = mongoose