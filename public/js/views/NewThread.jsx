/* jshint node:true */
"use strict";
var React = require('react');
var Reflux = require('reflux');
var Navigation = require('react-router').Navigation;

var ThreadsActions = require('../actions/ThreadsActions');
var SessionStore = require('../stores/SessionStore');
var ThreadsStore = require('../stores/ThreadsStore');


var NewThread = React.createClass({
	mixins: [
		Reflux.listenTo(ThreadsStore, "onThreadsChange"),
		Navigation
	],

	onThreadsChange: function (threads) {
		this.transitionTo('threads');
	},

	render: function () {
		return (
			<div>
				<h1>Create a new Thread</h1>
				<form className="pure-form pure-form-stacked">
					<label for="name">Thread name</label>
					<input className="new-thread-name" type="text" id="name" ref="name" />
					<label for="post-text">Thread text</label>
					<textarea rows="10" className="new-thread-text" id="post-text" ref="post_text"></textarea>
					<button type="submit" className="pure-button pure-button-primary new-thread-create-button" onClick={this.onSubmit}>Create</button>
				</form>
			</div>
		);
	},

	onSubmit: function (e) {
		e.preventDefault();
		var name = this.refs.name.getDOMNode().value;
		var post_text = this.refs.post_text.getDOMNode().value;
		var userId = SessionStore.current()._id;
		ThreadsActions.create({
			name: name,
			user_id: userId,
			post: post_text,
			timestamp: new Date()
		});
	}
});

module.exports = NewThread;
