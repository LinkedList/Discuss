/* jshint node:true */
"use strict";
var React = require('react');
var Reflux = require('reflux');

var ThreadsStore = require('../stores/ThreadsStore');
var ThreadsActions = require('../actions/ThreadsActions');
var SessionStore = require('../stores/SessionStore');

var ThreadItem = require('./ThreadItem.jsx');
var _ = require('lodash');

var Threads = React.createClass({
	mixins: [
		Reflux.listenTo(ThreadsStore, "onThreadsChange")
	],

	onThreadsChange: function (threads) {
		this.setState({
			threads: threads
		});
		this.refs.name.getDOMNode().value = "";
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
				<ul>
					{this.state.threads.map(function(t){
						return <li>{t.name}</li>;	
					})}
				</ul>
				<div>
					Create a new thread:
				</div>
				<form>
					<input type="text" ref="name" />
					<input type="button" value="Create" onClick={this.onClick}/>
				</form>
			</div>
		);
	},

	onClick: function () {
		var name = this.refs.name.getDOMNode().value;
		var userId = SessionStore.current()._id;
		ThreadsActions.create({
			name: name,
			userId: userId,
			timestamp: new Date()
		});
	}
	
});

module.exports = Threads;
