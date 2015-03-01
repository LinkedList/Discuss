"use strict";
var React = require('react');
var Router = require('react-router');
var {RouteHandler, Route, Link, State, DefaultRoute} = Router;

var Header = React.createClass({
	mixins: [State],
	render: function () {
		var user = this.props.user;
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
				</ul>
				<ul className="right pure-menu-list">
					<li className="pure-menu-item">
						<Link to="posts" className="link user-info">
							<img className="user-image" src={typeof user !== "undefined" ? user.picture.thumbnail : "#"} />
							{this.props.user.name.first + " " + this.props.user.name.last}
						</Link>
					</li>
					<li className="pure-menu-item">
						<a className="link" href="/logout" title="Logout"><i className="signout"></i></a>
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
