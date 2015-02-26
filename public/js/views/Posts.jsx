"use strict";
var React = require('react');
var Reflux = require('reflux');

var GeneralActions = require('../actions/GeneralActions');
var UsersActions = require('../actions/UsersActions');
var PostsStore = require('../stores/PostsStore');
var UsersStore = require('../stores/UsersStore');
var _ = require('lodash');

var FrontPost = require('./FrontPost.jsx');

var Posts = React.createClass({
	mixins: [
		Reflux.connect(PostsStore, "posts"),
		Reflux.connect(UsersStore, "users")
	],
	getInitialState: function () {
		return {
			posts: [],
			users: []
		};
	},

	componentDidMount: function () {
		GeneralActions.load();
		UsersActions.load();
	},

	render: function () {
		var _this = this;
		var posts = this.state.posts.map(function(p){

			var user = _.find(_this.state.users, {_id : p.user_id});

			return (
					<FrontPost key={p._id} text={p.text} user={user} timestamp={p.timestamp} />
			);
		});
		return (
			<div>
				<h1>Latest posts</h1>
				<div className="front-posts">
					{posts}
				</div>
			</div>
		);
	}
});

module.exports = Posts;
