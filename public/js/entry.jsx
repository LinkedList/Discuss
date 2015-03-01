/*jslint node: true */
"use strict";
require('../css/styles.sass');
var React = require('react');
var Router = require('react-router');
var Reflux = require('reflux');
var routes = require('./Routes.jsx');

Router.run(routes, function(Handler){
	React.render(<Handler />, document.body);
});
