/* jshint node: true */
"use strict";

var request = require('superagent');
var Reflux = require('reflux');

var API_URL = '/api/threads';

var ThreadsActions = Reflux.createActions({
		"load": {children: ["completed", "failed"]},
		"create": {children: ["completed", "failed"]}
});

ThreadsActions.load.listen(function() {
	var _this = this;
	request
		.get('/api/threads')
		.end(function(err, res){
			if(err) {
				_this.failed(err);
			}
			_this.completed(res.body);
		});
});

ThreadsActions.create.listen(function(thread) {
	var _this = this;
	request
		.post('/api/threads')
		.send(thread)
		.end(function(err, res){
			if(err) {
				_this.failed(err);
			}
			_this.completed(res.body);
		});
});

module.exports = ThreadsActions;
