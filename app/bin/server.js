'use strict';

const app = require('../app');
const http = require('http');

const port = process.env.PORT || 3000;
console.log('server js:' + process.env.API_URL);
app.set('port', port);

const server = http.createServer(app);

server.listen(port, () => { console.log('server up on ' + port); });
