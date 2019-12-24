"use strict";

const express                 = require('express');
const app                     = express();
const path                    = require('path');
const morgan                  = require('morgan');
const cors                    = require('cors');
const bodyParser              = require('body-parser');
const htmlCompressor          = require("html-compressor");

app.use(cors());
app.use(morgan('dev'));
app.use(htmlCompressor({js : true,css : true}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

/*--------------Require routes-------------*/
const index                     = require('./routes/index');
const api                       = require('./routes/api');
/*------------------------------------------*/

/*---------All Routes----------*/
app.use('/api/', api);
app.use('/', index);
/*-----------------------------*/


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  if(err.message){
    var errMsg = err.message;
    console.log(req.body,errMsg);
  }else{
        var errMsg = err;
        console.log(req.body,errMsg);
  }
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.send(errMsg);
});

module.exports = app;