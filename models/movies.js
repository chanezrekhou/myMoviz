var mongoose = require('mongoose');

var moviesSchema = mongoose.Schema({
    name: String,
    desc: String,
    img: String,
});

var moviesModel = mongoose.model('movies', moviesSchema);

module.exports = moviesModel;