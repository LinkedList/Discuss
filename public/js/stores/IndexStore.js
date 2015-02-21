"use strict";
var Reflux = require('reflux');
var request = require('superagent');
var IndexActions = require('../actions/IndexActions');

var IndexStore = Reflux.createStore({
	listenables: [IndexActions],

	init: function () {
		this.indexes = [];
	},

	_indexesChanged: function (indexes) {
		this.indexes = indexes;
		this.onIndexesChange(this.indexes);
	},

	_indexChanged: function (index) {
		for(var i in this.indexes) {
			if(this.indexes[i]._id === index._id) {
				this.indexes[i].name = index.name;
			}
		}
		this.onIndexesChange(this.indexes);
	},

	_indexAdded: function (index) {
		this.indexes.push(index);
		this.onIndexesChange(this.indexes);
	},

	_indexDeleted: function (_id) {
		this.indexes = this.indexes.filter(function(el) {
			return el._id !== _id;
		});
		this.onIndexesChange(this.indexes);
	},

	onSubmitIndex: function (name) {
		var _this = this;
		request
			.post('/api/index')
			.send({name: name})
			.end(function(err, res){
				if(err) {
					console.error(err);
					return;
				}
				_this._indexAdded(res.body);
			});
	},
	onDeleteIndex: function (_id) {
		var _this = this;
		request
			.del('/api/index/' + _id)
			.end(function(err, res){
				if(err) {
					console.error(err);
					return;
				}
				_this._indexDeleted(_id);
			});

	},
	onLoadIndexes: function () {
		var _this = this;
		request
			.get('/api/index')
			.end(function(err, res) {
				if(err) {
					console.error(err);
					return;
				}

				_this._indexesChanged(res.body);
			});
	},

	onIndexesChange: function (indexes) {
		this.trigger(indexes);
	},

	onUpdateIndex: function (_id, name) {
		var _this = this;
		request
			.post('/api/index/' + _id)
			.send({name: name})
			.end(function(err, res) {
				if(err) {
					console.error(err);
					return;
				}

				_this._indexChanged(res.body);
			});
	}
});

module.exports = IndexStore;
