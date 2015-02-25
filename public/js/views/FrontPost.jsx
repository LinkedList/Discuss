"use strict";

var React = require('react');
var Reflux = require('reflux');
var GeneralActions = require('../actions/GeneralActions');

var FrontPost = React.createClass({
	render: function () {
		var date = new Date(this.props.timestamp);
		return (
				<div className="front-post">
					<span className="front-post-text">
						{this.props.text}
					</span>
					<span className="front-post-user">
						{this.props.user}
					</span>
					<span className="front-post-date">
						{date.toDateString()}
					</span>
				</div>
		);
	}
});

module.exports = FrontPost;
