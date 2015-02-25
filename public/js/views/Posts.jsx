"use strict";
var React = require('react');
var Reflux = require('reflux');

var GeneralActions = require('../actions/GeneralActions');
var PostsStore = require('../stores/PostsStore');

var FrontPost = require('./FrontPost.jsx');

var Posts = React.createClass({
	mixins: [Reflux.connect(PostsStore, "posts")],
	getInitialState: function () {
		return {posts: []};
	},

	componentDidMount: function () {
		GeneralActions.load();
	},

	render: function () {
		var posts = this.state.posts.map(function(p){
			return (
					<FrontPost key={p._id} img={p.user_img} text={p.text} user={p.user} timestamp={p.timestamp} />
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
