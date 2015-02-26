"use strict";
var Reflux = require('reflux');
var UsersActions = require('../actions/UsersActions');
var GeneralStoreMixin = require('../mixins/GeneralStoreMixin')('users');

var UsersStore = Reflux.createStore({
	mixins: [GeneralStoreMixin],
	listenables: [UsersActions],
});

module.exports = UsersStore;
