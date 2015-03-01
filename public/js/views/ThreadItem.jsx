/* jshint node:true */
"use strict";

var React = require('react');
var Reflux = require('reflux');

var ThreadItem = React.createClass({
	render: function () {
		var date = new Date(this.props.timestamp);
		var user = this.props.user;
		return (
				<div className="front-post">
					<span className="front-post-text">
						{this.props.text}
					</span>
					<img className="front-post-user-image" src={typeof user !== 'undefined' ? user.picture.thumbnail : "#"} />
					<span className="front-post-user">
						{typeof user !== 'undefined' ? user.name.first + " " + user.name.last : "Undefined"}
					</span>
					<span className="front-post-date">
						{date.toDateString()}
					</span>
				</div>
		);
	}
});

module.exports = ThreadItem;
