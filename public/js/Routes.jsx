/*jslint node: true */
"use strict";
var React = require('react');
var Router = require('react-router');
var {RouteHandler, Route, Link, State, DefaultRoute} = Router;

var About = require('./views/About.jsx');
var Posts = require('./views/Posts.jsx');
var Threads = require('./views/Threads.jsx');
var NewThread = require('./views/NewThread.jsx');
var Profile = require('./views/Profile.jsx');
var App = require('./views/App.jsx');

var routes = (
	<Route name="app" path="/" handler={App}>
		<DefaultRoute handler={Posts} />
		<Route name="threads" path="/threads" handler={Threads} />
		<Route name="new-thread" path="/threads/new" handler={NewThread} />
		<Route name="posts2" handler={Posts} />
		<Route name="about" handler={About} />
		<Route name="user" path="/user/:id" handler={Profile} />
	</Route>
);

module.exports = routes;
