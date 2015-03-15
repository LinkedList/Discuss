/* jshint node:true */
"use strict";

var React = require('react');
var Reflux = require('reflux');
var State = require('react-router').State;
var ThreadStore = require('../stores/ThreadStore');
var ThreadsActions = require('../actions/ThreadsActions');

var Thread = React.createClass({
	mixins: [
		Reflux.listenTo(ThreadStore, "onThread"),
		State
	],

	getInitialState: function () {
		return {};
	},

	onThread: function (thread) {
		this.setState({
			thread: thread
		});
	},

	componentWillMount: function () {
		ThreadsActions.get(this.getParams().id);
	},

	render: function () {
		var loading = !this.state.thread;
		var thread = loading ? {} : this.state.thread;
		var posts = loading ? [] : thread.posts;

		
		return (
			<div>
				<h1>{loading ? "Loading..." : thread.name}</h1>
				<ul>
					{posts.map(function(p){
						return <li>{p.text}</li>;	
					})}
				</ul>
			</div>
		);
	}
});

module.exports = Thread;
