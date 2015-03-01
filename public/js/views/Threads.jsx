/* jshint node:true */
"use strict";
var React = require('react');
var Reflux = require('reflux');

var ThreadsStore = require('../stores/ThreadsStore');
var ThreadsActions = require('../actions/ThreadsActions');

var ThreadItem = require('./ThreadItem.jsx');
var _ = require('lodash');

var Threads = React.createClass({
	mixins: [
		Reflux.connect(ThreadsStore, "threads")
	],

	getInitialState: function () {
		return {
			threads: []
		}
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
			</div>
		);
	}
});

module.exports = Threads;
