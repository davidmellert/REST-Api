const mongoose = require('mongoose');

module.exports = function(){
    mongoose.connect('mongodb://localhost/Vidly', {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log('Connected to database...'));
}