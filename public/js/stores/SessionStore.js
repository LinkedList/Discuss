"use strict";
var Reflux = require('reflux');
var request = require('superagent');
var SessionActions = require('../actions/SessionActions');

var SessionStore = Reflux.createStore({
	listenables: [SessionActions],

	onGetUser: function (name) {
		var _this = this;
		request
			.get('/user')
			.end(function(err, res){
				if(err) {
					console.error(err);
					return;
				}
				_this.trigger(res.body);
			});
	},
});

module.exports = SessionStore;
