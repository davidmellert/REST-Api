const asyncMiddleware = require('../middleware/async');
const auth = require('../middleware/authorisator');
const admin = require('../middleware/admin');
const express = require('express');
const {Genre, validate} = require('../models/genre');

const router = express.Router();

router.get('/', async (req, res) => {
    throw new Error('Could not get the genres.');
    const genres =  await Genre
    .find()
    .sort({name: 1});
   
    res.send(genres);
});

router.get('/:id', async (req, res, next) => {
    try{
        const genre = await Genre.findById(req.params.id);
    if(!genre)
        return res.status(404).send('The genre with the given id was not found.');
    res.send(genre)
    }
    catch(ex){
       next(ex);
    }
     
});

router.post('/',auth, async (req, res) => {
    
    try{
        const result = validate(req.body);
        if(result.error)return res.status(400).send(result.error.details[0].message);

        const genre = new Genre({
            name: req.body.name    
        });
        await genre.save();
        res.send(genre);

    }
    catch(ex){
        res.status(500).send('Something failed.');
    }
});

router.put('/:id', auth, async (req, res) => {
    const result = validate(req.body);
    if(result.error)return res.status(400).send(result.error.details[0].message);

    const genre = await Genre.findByIdAndUpdate({_id: req.params.id}, {
        $set:{
            name: req.body.name
        }
    }, {new: true});

    if(!genre)return res.status(404).send('The genre with the given id was not found.');
    res.send(genre);
});

router.delete('/:id', [auth, admin], async (req, res) => {
    const genre = await Genre.findByIdAndDelete(req.params.id); 
    if(!genre) return res.status(404).send('The genre with the given id was not found.');
    res.send(genre);
    
}); 

module.exports = router;