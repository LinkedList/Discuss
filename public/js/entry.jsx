"use strict";
require('../css/styles.css');
var React = require('react');
var Reflux = require('reflux');

var Router = require('react-router');
var {RouteHandler, Route, Link, State } = Router;

var About = require('./views/About.jsx');
var Index = require('./views/Index.jsx');

var SessionActions = require('./actions/SessionActions');
var SessionStore = require('./stores/SessionStore');

var App = React.createClass({
	mixins:[State, Reflux.connect(SessionStore, "user")],

	getInitialState: function () {
		return {
			user: {name: ""}
		};
	},

	componentDidMount: function () {
		SessionActions.getUser();
	},

	render: function () {
		return (
			<div className="header">
				<div className="pure-menu pure-menu-horizontal">
					<Link to="app" className="pure-menu-heading">NMDiscuss</Link>
					<ul className="pure-menu-list">
						<li className={this.activeRoute('index')}>
							<Link to="index" className="pure-menu-link">Index</Link>
						</li>
						<li className={this.activeRoute('about')}>
							<Link to="about" className="pure-menu-link">About</Link>
						</li>
						<li className="pure-menu-item">
							<a className="pure-menu-link" href="#">Logged in as {this.state.user.name}</a>
						</li>
					</ul>
				</div>
				<div className="content">
					<RouteHandler />
				</div>
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

var routes = (
	<Route name="app" path="/" handler={App}>
		<Route name="index" handler={Index} />
		<Route name="about" handler={About} />
	</Route>
);

Router.run(routes, function(Handler){
	React.render(<Handler />, document.body);
});
