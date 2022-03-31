const express = require('express');
const {Movie, validate} = require('../models/movie');
const { Genre } = require('../models/genre');
const auth = require('../middleware/authorisator');

const router = express.Router();

router.get('/', async (req, res) => {
   const movies =  await Movie
   .find()
   .sort({title: 1});
   
   res.send(movies);
});

router.get('/:id', async (req, res) => {
    const movie = await Movie.findById(req.params.id);
    if(!movie)
        return res.status(404).send('The movie with the given id was not found.');
    res.send(movie)
});

router.post('/', auth, async (req, res) => {
    const result = validate(req.body);
    if(result.error)return res.status(400).send(result.error.details[0].message);

    const genre = await Genre.findById(req.body.genreId);
    if(!genre) return res.status(404).send('There is no genre with the given id.');

    const movie = new Movie({
        title: req.body.title,
        genre: {
            _id: genre._id,
            name: genre.name
        },
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate    
    });
    await movie.save();
    res.send(movie);
});

router.put('/:id', auth, async (req, res) => {
    const result = validate(req.body);
    if(result.error)return res.status(400).send(result.error.details[0].message);

    const genre = await Genre.findById(req.body.genreId);
    if(!genre) return res.status(404).send('There is no genre with the given id.');

    const movie = await Movie.findByIdAndUpdate({_id: req.params.id}, {
        $set:{
            title: req.body.title,
            genre: {
                _id: genre._id,
                name: genre.name
            },
            numberInStock: req.body.numberInStock,
            dailyRentalRate: req.body.dailyRentalRate
        }
    }, {new: true});

    if(!movie)return res.status(404).send('The movie with the given id was not found.');
    res.send(movie);
});

router.delete('/:id', auth, async (req, res) => {
    const movie = await Movie.findByIdAndDelete(req.params.id); 
    if(!movie) return res.status(404).send('The movie with the given id was not found.');
    res.send(movie);
    
}); 

module.exports = router;