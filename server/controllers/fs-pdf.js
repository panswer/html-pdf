const fs = require('fs');
const pdf = require('html-pdf');
const path = require('path');
const { SearchScrypt } = require('../security/antiscript');

require('../config/config');

const PDF = (req, res) => {
    let nombre = new Date().getTime();
    let infoUsuario = {
        ciudad: req.body.ciudad,
        fecha: req.body.fecha,
        dirigida: req.body.dirigida,
        empleado: req.body.empleado,
        empresa: req.body.empresa,
        fechaInc: req.body.fechaInc,
        cargo: req.body.cargo,
        horarioD: req.body.horarioD,
        horarioH: req.body.horarioH,
        diasDescanso: req.body.diasDescanso,
        salario: req.body.salario,
        RRHH: req.body.RRHH,
        cargoRRHH: req.body.cargoRRHH,
        telefono: req.body.telefono,
        email: req.body.email,
        lugar: req.body.lugar
    };
    let html = fs.readFileSync(path.resolve(__dirname, '../html-pdf/base.html'), 'utf8');
    html = html.replace('|ciudad|', infoUsuario['ciudad']);
    html = html.replace('|fecha|', infoUsuario['fecha']);
    html = html.replace('|dirigida|', infoUsuario['dirigida']);
    html = html.replace('|empleado|', infoUsuario['empleado']);
    html = html.replace('|empleado|', infoUsuario['empleado']);
    html = html.replace('|empresa|', infoUsuario['empresa']);
    html = html.replace('|fechaInc|', infoUsuario['fechaInc']);
    html = html.replace('|cargo|', infoUsuario['cargo']);
    html = html.replace('|horarioD|', infoUsuario['horarioD']);
    html = html.replace('|horarioH|', infoUsuario['horarioH']);
    html = html.replace('|diasDescanso|', infoUsuario['diasDescanso']);
    html = html.replace('|salario|', infoUsuario['salario']);
    html = html.replace('|RRHH|', infoUsuario['RRHH']);
    html = html.replace('|cargoRRHH|', infoUsuario['cargoRRHH']);
    html = html.replace('|telefono|', infoUsuario['telefono']);
    html = html.replace('|email|', infoUsuario['email']);
    if (SearchScrypt(html)) {
        return res.status(400).json({
            ok: false,
            err: {
                message: 'No se permiten scripts'
            }
        });
    }
    let option = {
        format: 'A4',
        base: `file:${path.resolve(__dirname, '../html-pdf/css')}`
    }
    pdf.create(html, option).toFile(`${path.resolve(__dirname,'../PDFs')}/${nombre}.pdf`, (err, resp) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        res.json({
            ok: true,
            url: `http://localhost:3000/fs/${nombre}.pdf`
        });
    });
}
const cargarPDF = (req, res) => {
    res.sendFile(`${path.resolve(__dirname,'../PDFs')}/${req.params.usuario}`);
}
module.exports = {
    PDF,
    cargarPDF
}