const fs = require('fs');
const pdf = require('html-pdf');
const path = require('path');
const { SearchScrypt } = require('../security/antiscript');

require('../config/config');

const FS_PDF = (req, res) => {
    let html = fs.readFileSync(path.resolve(__dirname, '../html-pdf/html2.html'), 'utf8');
    html = html.replace('Titulo', req.body.titulo);
    html = html.replace('Contenido', req.body.contenido);
    if (SearchScrypt(html)) {
        return res.status(400).json({
            ok: false,
            err: {
                message: 'Intento de carga de script'
            }
        });
    }
    pdf.create(html, { format: 'Letter' }).toFile(path.resolve(__dirname, '../PDFs/test.pdf'), (err, resp) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        res.json({
            ok: true,
            resp
        });
    });
    /* let options = {
        format: 'Letter'
    };
    pdf.create(html, options).toFile('./server/PDFs/pdf1.pdf', (err, resp) => {
        if (err) {
            console.log(`PDF no generado`);
            console.log(err);
            return res.status(500).json({
                ok: false,
                err
            });
        }
        res.json({
            ok: true,
            resp
        });
    }); */
}
const FS_PDF_CSS = (req, res) => {
    let html = fs.readFileSync(path.resolve(__dirname, '../html-pdf/html2.html'), 'utf8');
    let options = {
        format: 'A4',
        base: `file:${path.resolve(__dirname,'../html-pdf/css/')}`
    };
    pdf.create(html, options).toFile('./server/PDFs/pdf2.pdf', (err, resp) => {
        if (err) {
            console.log(`ERROR en FS_PDF_CSS`);
            return res.status(500).json({
                ok: false,
                err
            });
        }
        res.json({
            ok: true,
            resp
        });
    });
}
const PDF = (req, res) => {
    let html = `${req.body.html}`;
    let options = {
        format: 'A4'
    }
    pdf.create(html, options).toFile('./server/PDFs/pdf3.pdf', (err, resp) => {
        if (err) {
            console.log('ERROR en PDF');
            return res.status(500).json({
                ok: true,
                err
            });
        }
        res.json({
            ok: true,
            resp
        });
    });
}
const PDF_FILE = (req, res) => {
    let archivo = req.files.archivo;
    archivo.mv(path.resolve(__dirname, '../html-pdf/html4.html'), err => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        let html = fs.readFileSync(path.resolve(__dirname, '../html-pdf/html4.html'), 'utf8');
        let options = {
            format: 'Letter'
        };
        pdf.create(html, options).toFile('./server/PDFs/pdf1.pdf', (err, resp) => {
            if (err) {
                console.log(`PDF no generado`);
                console.log(err);
                return res.status(500).json({
                    ok: false,
                    err
                });
            }
            res.json({
                ok: true,
                resp
            });
        });
    });
}
module.exports = {
    FS_PDF,
    FS_PDF_CSS,
    PDF,
    PDF_FILE
}