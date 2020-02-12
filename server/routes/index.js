const express = require('express');

const app = express();

app.use(require('./generatePDF'));

module.exports = app