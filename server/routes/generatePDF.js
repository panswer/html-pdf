const express = require('express');
const path = require('path');
const fileUpload = require('express-fileupload');
const app = express();
const { PDF, cargarPDF } = require('../controllers/fs-pdf');
// Obtener Archivos de usuario
app.use(fileUpload());

app.post('/fs', PDF);
app.get('/fs/:usuario', cargarPDF);

module.exports = app;