const express = require('express');
const webpack = require('webpack');
const path = require('path');
const config = require('../webpack.config');
const open = require('open');
const fs = require('fs');
let history = require('connect-history-api-fallback');


/* eslint-disable no-console */

const port = 3005;
const app = express();
const compiler = webpack(config);
const jsonDir = path.join(__dirname, '../src/mock/');


// app.get('*', function (req, res) {
//     res.sendFile(path.join(__dirname, '../src/index.html'));
// });


app.listen(port, function(err) {
    if (err) {
        console.log(err);
    } else {
        open(`http://localhost:${port}`);
    }
});