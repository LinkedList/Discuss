/* jshint node:true */
"use strict";
var React = require('react');
var Reflux = require('reflux');

var Navigation = require('react-router').Navigation;
var ThreadsStore = require('../stores/ThreadsStore');
var ThreadsActions = require('../actions/ThreadsActions');
var SessionStore = require('../stores/SessionStore');

var ThreadItem = require('./ThreadItem.jsx');
var _ = require('lodash');

var Threads = React.createClass({
	mixins: [
		Reflux.listenTo(ThreadsStore, "onThreadsChange"),
		Navigation
	],

	onThreadsChange: function (threads) {
		this.setState({
			threads: threads
		});
	},

	onNewThread: function () {
		this.transitionTo('new-thread');
	},

	getInitialState: function () {
		return {
			threads: []
		};
	},

	componentWillMount: ThreadsActions.load,

	render: function () {
		return (
			<div>
				<h1>Latest threads</h1>
				<button onClick={this.onNewThread} className="pure-button pure-button-primary">New Thread</button>
				<ul>
					{this.state.threads.map(function(t){
						return <li>{t.name}</li>;	
					})}
				</ul>
			</div>
		);
	}	
});

module.exports = Threads;
