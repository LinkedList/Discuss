"use strict";

var React = require('react');
var Reflux = require('reflux');
var GeneralActions = require('../actions/GeneralActions');

var FrontPost = React.createClass({
	render: function () {
		return (
				<tr className="front-post">
					<td>
						{this.props.text}
					</td>
					<td>
						{this.props.user}
					</td>
					<td>
						{this.props.timestamp}
					</td>
				</tr>
		);
	}
});

module.exports = FrontPost;
