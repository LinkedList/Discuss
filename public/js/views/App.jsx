/*jslint node: true */
"use strict";
var React = require('react');
var Reflux = require('reflux');
var Router = require('react-router');
var {RouteHandler, Route, Link, State, DefaultRoute} = Router;

var SessionActions = require('../actions/SessionActions');
var SessionStore = require('../stores/SessionStore');

var Header = require('./Header.jsx');

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

module.exports = App;
