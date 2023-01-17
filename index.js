'use-strict';
require('dotenv').config();

const express = require('express');

const app = express();
const router = express.Router();
const bodyParser = require('body-parser');
const port = 3000;

new (require('./controller/usuario'))(router);

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(router);

const server = app.listen(port, () => {
    console.log('listening in port ' + port);
});

module.exports = {
    app, server
};
