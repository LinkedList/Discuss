"use strict";
var Reflux = require('reflux');
var GeneralActions = require('../actions/GeneralActions');
var GeneralStoreMixin = require('../mixins/GeneralStoreMixin')('index');

var IndexStore = Reflux.createStore({
	mixins: [GeneralStoreMixin],
	listenables: [GeneralActions],
});

module.exports = IndexStore;
