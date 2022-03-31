const express = require('express');
const mongoose = require('mongoose');
const Fawn = require('fawn');
const { Rental, validate} = require('../models/rental');
const { Customer } = require('../models/customer');
const { Movie } = require('../models/movie');
const auth = require('../middleware/authorisator');

const router= express.Router();


Fawn.init('mongodb://localhost/Vidly');

router.get('/', async (req, res) => {
    const rentals = await Rental.find().sort('dateOut');
    res.send(rentals);
});

router.post('/', auth, async (req, res) => {
    const result = validate(req.body);
    if(result.error) return res.status(400).send(result.error.details[0].message);

    const customer = await Customer.findById(req.body.customerId);
    if(!customer) return res.status(400).send('Invalid customerId...');
    const movie = await Movie.findById(req.body.movieId);
    if(!movie) return res.status(400).send('Invalid movieId...');

    if(movie.numberInStock === 0)return res.status(400).send('No more copies left...');

    let rental = new Rental({
        customer: {
            _id: customer._id,
            name: customer.name,            
            isGold: customer.isGold,
            phone: customer.phone
        },
        movie: {
            _id: movie._id,
            title: movie.title,
            dailyRentalRate: movie.dailyRentalRate
        }
    });
    /*rental = await rental.save();
    movie.numberInStock--;
    movie.save();*/
try{
    new Fawn.Task()
        .save('rentals', rental)
        .update('movies', { _id: movie._id}, {
            $inc: { numberInStock: -1}
        })
        .run();

    res.send(rental);

}catch(ex){
    res.status(500).send('Something failed.');
}
    

});

module.exports = router;