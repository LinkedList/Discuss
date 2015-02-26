"use strict";

var Reflux = require('reflux');

var UsersActions = Reflux.createActions([
		"add",
		"delete",
		"update",
		"load"
]);

module.exports = UsersActions;
