// Import libraries
const app = require('express')();
const { convertAllCosts } = require('../models/rateConverter');
const { calculateFee, getAmortization } = require('../models/annuities');
const { exportCSV } = require('../models/excel');

// Set routes

/**
 * 
 * Service to calculate the annuity with the indicated method. 
 * 
 * @param {*} request - request endpoint
 * @param {*} response - response endpoint
 * 
 * @returns json data to response
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
 * Service to obtain the amortization with the indicated method.
 * 
 * @param {*} request - request endpoint
 * @param {*} response - response endpoint
 * 
 * @returns json data to response
 */
app.post('/annuity/getamortization', (request, response) => {
    let { deadline, value, annuity, interest, extra, payments } = request.body;
    getAmortization(deadline, value, Number(annuity), interest, extra, payments).then(result => {
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
 * Service to convert an interest rate to any other.
 * 
 * @param {*} request - request endpoint
 * @param {*} response - response endpoint
 * 
 *  @returns json data to response
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

app.post('/getcsv', (request, response) => {
    let data = request.body.data;
    exportCSV(data).then(result => {
        console.log(result);
        response.json(result);
    })
});

// Init status server
app.get('/', (request, response) => {
    return response.json({ satus: 'succes', server: 'API running and ready to receive requests.' })
});

module.exports = app;