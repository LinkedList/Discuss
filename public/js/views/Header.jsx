/* jshint node:true */
"use strict";
var React = require('react');
var Router = require('react-router');
var LoggedIn = require('./LoggedIn.jsx');
var NotLoggedIn = require('./NotLoggedIn.jsx');
var {RouteHandler, Route, Link, State, DefaultRoute} = Router;

var Header = React.createClass({
	mixins: [State],
	render: function () {
		var user = this.props.user;
		var rightHeader = !user._id ? <NotLoggedIn /> : <LoggedIn user={user} />;
		return (
			<div className="header pure-menu pure-menu-horizontal">
				<Link to="app" className="pure-menu-heading">{this.props.appName}</Link>
				<ul className="pure-menu-list">
					<li className={this.activeRoute('threads')}>
						<Link to="threads" className="link">Threads</Link>
					</li>
					<li className={this.activeRoute('about')}>
						<Link to="about" className="link">About</Link>
					</li>
				</ul>

				{rightHeader}
			</div>
		);
	},

	/*
	 * returns css styles for top menu links, selected if the route is active
	 */
	activeRoute: function (route) {
		return this.isActive(route) ?
			"pure-menu-item pure-menu-selected" :
			"pure-menu-item";
	}

});

module.exports = Header;
