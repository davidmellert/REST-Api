const express = require('express');
const auth = require('../middleware/authorisator');
const {Customer, validate} = require('../models/customer');

const router = express.Router();

router.get('/', async (req, res) => {
    const customers = await Customer.find().sort({name: 1});
    if(!customers) return res.status(404).send('There are no customers!');
    res.send(customers);
});

router.get('/:id', async (req, res) => {
    const customer = await Customer.findById(req.params.id);
    if(!customer) return res.status(404).send('Could not find customer with the given id...');
    res.send(customer);
});

router.post('/', auth, async (req, res) => {
    const result = validate(req.body);
    if(result.error) return res.status(400).send(result.error.details[0].message);

    const customer = new Customer({
        name: req.body.name,
        isGold: req.body.isGold,
        phone: req.body.phone
    });
    await customer.save();
    res.send(customer);
});

router.put('/:id', auth, async (req, res) => {
    const result = validate(req.body);
    if(result.error) return res.status(400).send(result.error.details[0].message);

    const customer = await Customer.findByIdAndUpdate(req.params.id , {
        $set: {
            name: req.body.name,
            isGold: req.body.isGold,
            phone: req.body.phone
        }
    }, {new: true});
    if(!customer) return res.status(404).send('Could not find customer with the given id...');
    res.send(customer);
});

router.delete('/:id', auth, async (req, res) => {
    const customer = await Customer.findByIdAndDelete(req.params.id);
    if(!customer) return res.status(404).send('Could not find customer with the given id...');
    res.send(customer);
});

module.exports = router;