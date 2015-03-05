/* jshint node: true */
"use strict";
var Reflux = require('reflux');
var ThreadsActions = require('../actions/ThreadsActions');

var ThreadsStore = Reflux.createStore({
	listenables: [ThreadsActions],

	init: function () {
		this.threads = [];
	},
	onLoadCompleted: function (threads) {
		this.threads = threads;
		this.trigger(this.threads);
	},

	onLoadFailed: function (response) {
		console.error(response);
	},

	onCreateCompleted: function (thread) {
		this.threads.push(thread);
		this.trigger(this.threads);
	}
});

module.exports = ThreadsStore;
