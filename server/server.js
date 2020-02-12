const express = require('express');
const cors = require('cors');

// Configuracion de server
require('./config/config');

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded(app));

app.use(require('./routes/index'));

app.listen(process.env.PORT, err => {
    if (err) {
        console.log(`ERROR: server no iniciado en puerto: ${process.env.PORT}`);
    } else {
        console.log(`SUCCESS: server iniciado en puerto: ${process.env.PORT}`);
    }
});