// Import libraries
const app = require('express')();
const { convertAllCosts } = require('../models/rateConverter');
const { calculateFee, getAmortization } = require('../models/annuities');
// Set routes

/**
 * 
 */
app.post('/annuity', (request, response) => {
    let { value, interest, deadline } = request.body;
    calculateFee(value, interest, deadline).then(result => {
        response.json({
            status: 'success',
            rest: result
        })
    }).catch(error => {
        response.status(400).json({
            status: 'failed',
            error: error.message
        })
    });
});

/**
 * 
 */
app.post('/annuity/getamortization', (request, response) => {
    let { deadline, value, annuity, interest } = request.body;
    getAmortization(deadline, value, annuity, interest).then(result => {
        response.json({
            status: 'success',
            rest: result
        })
    }).catch(error => {
        response.status(400).json({
            status: 'failed',
            error: error.message
        })
    });
});

/**
 * 
 */
app.post('/rateconverter', (request, response) => {
    let { type, frequency, method, rate } = request.body;
    convertAllCosts(type, frequency, method, rate).then(result => {
        response.json({
            status: 'success',
            rest: result
        })
    }).catch(error => {
        response.status(400).json({
            status: 'failed',
            error: error.message
        })
    });
});

module.exports = app;