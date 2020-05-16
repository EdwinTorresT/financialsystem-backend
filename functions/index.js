// Import libraries
const functions = require('firebase-functions');
const app = require('express')();
const cors = require('cors');
// Config server
app.use(cors({ origin: true }));
// Get server
app.use(require('./server'));

// Export Firebase Function
exports.api = functions.https.onRequest(app);