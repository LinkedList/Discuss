/* jshint node: ture */
"use strict";

var request = require('superagent');
var Reflux = require('reflux');

var API_URL = '/api/threads';

var ThreadsActions = Reflux.createActions({
		"load": {children: ["completed", "failed"]}
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

module.exports = ThreadsActions;
