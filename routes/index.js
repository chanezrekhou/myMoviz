var express = require('express');
var router = express.Router();
var request = require("sync-request");
var moviesModel = require('../models/movies');


/* GET home page. */
router.get('/', function(req, res, next) {
  var result = request("GET",`https://api.themoviedb.org/3/discover/movie?api_key=2ea6fc17cb93fe5b8d72b292b1be76af&language=fr&sort_by=popularity.desc`);
  res.render('index', { title: 'Express' });
});

router.get('/new-movies', function(req, res, next) {
  var result = request("GET",`https://api.themoviedb.org/3/discover/movie?api_key=2ea6fc17cb93fe5b8d72b292b1be76af&language=fr&sort_by=popularity.desc`);
  var resultJSON = JSON.parse(result.body)
  res.json({resultJSON})
});


router.post('/wishlist-movies', async function(req, res, next) {
  var newMovie = new moviesModel({
    name: req.body.name,
    desc: req.body.desc,
    img: req.body.img
  })
    var saved = await newMovie.save();
    res.json({saved})
});

router.delete('/wishlist-movies', async function(req, res, next) {
  console.log(req.query);
  var deleted = await moviesModel.deleteOne(
    {name: req.query.name}
 );
    res.json({deleted:true})
});

router.get('/wishlist-movies', async function(req, res, next) {
  var listMovies = await moviesModel.find();
    res.json({listMovies})
    console.log(listMovies);
});

module.exports = router;
