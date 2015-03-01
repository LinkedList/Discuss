/* jshint node: true */
"use strict";
var Reflux = require('reflux');
var ThreadsActions = require('../actions/ThreadsActions');
var GeneralStoreMixin = require('../mixins/GeneralStoreMixin');

var ThreadsStore = Reflux.createStore({
	mixins: [GeneralStoreMixin('threads')],
	listenables: [ThreadsActions]
});

module.exports = ThreadsStore;
