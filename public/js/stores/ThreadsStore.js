/* jshint node: true */
"use strict";
var Reflux = require('reflux');
var ThreadsActions = require('../actions/ThreadsActions');

var ThreadsStore = Reflux.createStore({
	listenables: [ThreadsActions],
	onLoadCompleted: function (threads) {
		this.trigger(threads);
	},

	onLoadFailed: function (response) {
		console.error(response);
	}
});

module.exports = ThreadsStore;
