/* jshint node:true */
"use strict";
var React = require('react');
var Router = require('react-router');
var {RouteHandler, Route, Link, State, DefaultRoute} = Router;

var LoggedIn = React.createClass({
	mixins: [State],
	render: function () {
		var user = this.props.user;
		return (
			<ul className="right pure-menu-list">
				<li className={this.activeRoute('user')}>
					<Link to="user" params={{id: user._id}} className="link user-info">
						<img className="user-image" src={typeof user !== "undefined" ? user.picture.thumbnail : "#"} />
						{this.props.user.name.first + " " + this.props.user.name.last}
					</Link>
				</li>
				<li className="pure-menu-item">
					<a className="link" href="/logout" title="Logout"><i className="signout"></i></a>
				</li>
			</ul>
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

module.exports = LoggedIn;
