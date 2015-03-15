/* jshint node:true */
"use strict";

var React = require('react');
var Reflux = require('reflux');
var Navigation = require('react-router').Navigation;

var ThreadItem = React.createClass({
	mixins: [
		Navigation
	],
	render: function () {
		var thread = this.props.thread;
		return (
				<li className="thread-item">
					<a href="#" className="thread-item-header" onClick={this.onThreadClick}>
						{thread.name}
					</a>
					<div className="thread-item-timestamp">{new Date(thread.timestamp).toDateString()}</div>
				</li>
		);
	},

	onThreadClick: function (e) {
		e.preventDefault();
		this.transitionTo('thread', {id: this.props.thread._id});
	},
});

module.exports = ThreadItem;
