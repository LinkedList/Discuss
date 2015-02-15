var express = require('express');
var mongojs = require('mongojs');

var app = express();

//initialize db
var db = mongojs("nmdiscuss");

//configs
require('./config/passport')(db);
require('./config/appConfig')(app);

// routes
app.use('/', require('./routes/basic')(db));


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        console.error(err);
        console.error(err.stack);
        res.status(err.status || 500).json({
            message: err.message,
            error: err,
            stack: JSON.stringify(err.stack)
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500).json({
        message: err.message,
        error: {}
    });
});

module.exports = app;
