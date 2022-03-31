const Joi = require('joi');
const mongoose = require('mongoose');

const genreSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 3,
        max: 50
    }
})

const Genre = mongoose.model('Genre', genreSchema, 'genres');

function validateGenre(genre){
    const schema = Joi.object({
        name: Joi.string().min(3).max(50).required()
    });
    return schema.validate(genre);
}
exports.genreSchema = genreSchema;
exports.Genre = Genre;
exports.validate = validateGenre;