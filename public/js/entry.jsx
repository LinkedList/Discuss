/*jslint node: true */
"use strict";
require('../css/styles.sass');
var React = require('react');
var Reflux = require('reflux');

var Router = require('react-router');
var {RouteHandler, Route, Link, State, DefaultRoute} = Router;

var About = require('./views/About.jsx');
var Posts = require('./views/Posts.jsx');
var Header = require('./views/Header.jsx');
var Profile = require('./views/Profile.jsx');

var SessionActions = require('./actions/SessionActions');
var SessionStore = require('./stores/SessionStore');

var APP_NAME = document.body.dataset.appName;

var App = React.createClass({
	mixins:[State, Reflux.connect(SessionStore, "user")],

	getInitialState: function () {
		return {
			user: {
				name: {first: "", last: ""},
				picture: {
					thumbnail: "#"
				}
			}
		};
	},

	componentWillMount() {
		SessionActions.getUser();
	},

	render: function () {
		return (
			<div className="page">
				<Header user={this.state.user} appName={APP_NAME}/>
				<div className="content">
					<RouteHandler />
				</div>
			</div>
		);
	}
});

var routes = (
	<Route name="app" path="/" handler={App}>
		<DefaultRoute handler={Posts} />
		<Route name="posts2" handler={Posts} />
		<Route name="about" handler={About} />
		<Route name="profile" handler={Profile} />
	</Route>
);

Router.run(routes, function(Handler){
	React.render(<Handler />, document.body);
});
