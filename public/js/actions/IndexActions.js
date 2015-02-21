"use strict";

var Reflux = require('reflux');

var IndexActions = Reflux.createActions([
		"submitIndex",
		"loadIndexes",
		"deleteIndex",
		"updateIndex"
]);

module.exports = IndexActions;
