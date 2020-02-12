const express = require('express');
const path = require('path');
const fileUpload = require('express-fileupload');
const app = express();
const { FS_PDF, FS_PDF_CSS, PDF, PDF_FILE } = require('../controllers/fs-pdf');
// Obtener Archivos de usuario
app.use(fileUpload());

app.post('/fs', FS_PDF);
app.post('/fs/css', FS_PDF_CSS);
app.post('/pdf', PDF);
app.post('/upload', function(req, res) {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }

    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    let sampleFile = req.files.sampleFile;

    // Use the mv() method to place the file somewhere on your server
    sampleFile.mv(path.resolve(__dirname, '../html-pdf'), function(err) {
        if (err)
            return res.status(500).send(err);

        res.send('File uploaded!');
    });
});

module.exports = app;