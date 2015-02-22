"use strict";

var Reflux = require('reflux');

var GeneralActions = Reflux.createActions([
		"add",
		"delete",
		"update",
		"load"
]);

module.exports = GeneralActions;
