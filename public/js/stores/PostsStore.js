"use strict";
var Reflux = require('reflux');
var GeneralActions = require('../actions/GeneralActions');
var GeneralStoreMixin = require('../mixins/GeneralStoreMixin');

var PostsStore = Reflux.createStore({
	mixins: [GeneralStoreMixin('posts')],
	listenables: [GeneralActions],
});

module.exports = PostsStore;
