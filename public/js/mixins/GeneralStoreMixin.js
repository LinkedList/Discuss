"use strict";
var request = require('superagent');

var generalStoreMixin = function (collection) {
	return {
		init: function () {
			this.localCollection = [];
		},

		_load: function (localCollection) {
			this.localCollection = localCollection;
			this.triggerChange();
		},

		_updated: function (object) {
			console.log(object);
			for(var i in this.localCollection) {
				if(this.localCollection[i]._id === object._id) {
					for(var prop in object) {
						if(object.hasOwnProperty(prop)) {
							this.localCollection[i][prop] = object[prop];
						}
					}
					break;
				}
			}
			this.triggerChange();
		},

		_added: function (object) {
			this.localCollection.push(object);
			this.triggerChange();
		},

		_deleted: function (_id) {

			this.localCollection = this.localCollection.filter(function(el) {
				return el._id !== _id;
			});
			this.triggerChange();
		},

		onAdd: function (object) {
			var _this = this;
			request
				.post('/api/' + collection)
				.send(object)
				.end(function(err, res){
					if(err) {
						console.error(err);
						return;
					}
					_this._added(res.body);
				});
		},

		onDelete: function (_id) {
			var _this = this;
			request
				.del('/api/' + collection + '/' + _id)
				.end(function(err, res){
					if(err) {
						console.error(err);
						return;
					}
					_this._deleted(_id);
				});

		},

		onLoad: function () {
			var _this = this;
			request
				.get('/api/' + collection)
				.end(function(err, res) {
					if(err) {
						console.error(err);
						return;
					}

					_this._load(res.body);
				});

		},

		onUpdate: function (_id, object) {
			var _this = this;
			request
				.post('/api/'+ collection +'/' + _id)
				.send(object)
				.end(function(err, res) {
					if(err) {
						console.error(err);
						return;
					}

					_this._updated(res.body);
				});
		},

		triggerChange: function () {
			this.trigger(this.localCollection);
		}
	};
};

module.exports = generalStoreMixin;
