"use strict";
var React = require('react');
var Router = require('react-router');
var {RouteHandler, Route, Link, State, DefaultRoute} = Router;

var Header = React.createClass({
	mixins: [State],
	render: function () {
		return (
			<div className="header pure-menu pure-menu-horizontal">
				<Link to="app" className="pure-menu-heading">{this.props.appName}</Link>
				<ul className="pure-menu-list">
					<li className={this.activeRoute('posts2')}>
						<Link to="posts2" className="link">Posts</Link>
					</li>
					<li className={this.activeRoute('about')}>
						<Link to="about" className="link">About</Link>
					</li>
					<li className="pure-menu-item">
						<div className="user-info">{this.props.user.name}</div>
					</li>
				</ul>
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
