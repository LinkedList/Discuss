/* jshint node: true */
"use strict";
var Reflux = require('reflux');
var ThreadsActions = require('../actions/ThreadsActions');

var ThreadsStore = Reflux.createStore({
	listenables: [ThreadsActions],

	init: function () {
		this.thread = {};
	},
	onGetCompleted: function (thread) {
		this.thread = thread;
		this.trigger(this.thread);
	}

});

module.exports = ThreadsStore;
