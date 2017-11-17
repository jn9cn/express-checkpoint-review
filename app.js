'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var app = express();
module.exports = app; // this line is only used to make testing easier.

// remember to plug in your router and any other middleware you may need here.

// Note: Bind application-level middleware to an instance of the app object using app.use()

// Add body-parsing middleware first to ensure POST requests provide a body object (req.body) with the accessible querystring or JSON values
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());

// This router exported from ./routes is the next level of middleware.
// Because it is qualified by the '/users' path, it only applies to paths that match /users + (whatever the path is in ./routes)
app.use('/users', require('./routes'));

// Error handling middleware comes last.
// Express identifies this as error handling middleware because it has 4 parameters, the first of which is an 'err' provided from some error throwing middleware as a call like 'next(err)'
// http://expressjs.com/en/guide/error-handling.html
app.use(function (err, req, res, next) {
    console.log(err);
    res.status(err.status || 500).send(err.message)
});

if (!module.parent) app.listen(3000); // conditional prevents a very esoteric EADDRINUSE issue with mocha watch + supertest + npm test.
