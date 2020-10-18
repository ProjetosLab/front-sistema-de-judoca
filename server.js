const express = require('express');
const path = require('path');
const app = express();

app.use(express.static('./dist/sistema-de-judocas'));

app.get('/*', function(req, res) {
    res.sendFile('index.html', {root: 'dist/sistema-de-judocas/'});
});

app.listen(process.env.PORT || 8080);