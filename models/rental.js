const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const mongoose = require('mongoose');

const rentalSchema = new mongoose.Schema({
    customer: {
        type: new mongoose.Schema({
            name: {
                type: String,
                required: true,
                min: 3,
                max: 50
            },
            isGold: {
                type: Boolean,
                default: false
            },
            phone:{
                type: String,
                alphanum: true,
                min: 3,
                max: 50
            }
        }),
        required: true
    },
    movie: {
        type: new mongoose.Schema({
            title: {
                type: String,
                required: true,
                min: 3,
                max: 50
            },
            dailyRentalRate: {
                type: Number,
                required: true,
                min: 0,
                max: 355
            }
        }),
        required: true
    },
    dateOut: {
        type: Date,
        required: true,
        default: Date.now
    },
    dateReturned: {
        type: Date
    },
    rentalFee: {
        type: Number,
        min: 0
    }
});

const Rental = mongoose.model('Rental', rentalSchema, 'rentals');

function validateRental(rental){
    const schema = Joi.object({
        customerId: Joi.objectId().required(),
        movieId: Joi.objectId().required()     
    });
    return schema.validate(rental);
}

exports.Rental = Rental;
exports.validate = validateRental;