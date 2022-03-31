const mongoose = require('mongoose');
const Joi = require('joi');

const Customer = mongoose.model('Customer', mongoose.Schema({
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
}), 'customers');

function validateCustomer(customer){
    const schema = Joi.object({
        name: Joi.string().min(3).max(50).required(),
        isGold: Joi.boolean(),
        phone: Joi.string().alphanum().min(3).max(50).required()
    });
    return schema.validate(customer);
}

exports.Customer = Customer;
exports.validate = validateCustomer;