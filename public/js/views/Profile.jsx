/*jslint node: true */
"use strict";
var React = require('react');
var State = require('react-router').State;

var Profile = React.createClass({
	mixins: [State],
	render: function () {
		var id = this.getParams().id;
		return (
			<div>
				Hello there, you are on the Profile page of user {id}
			</div>
		);
	}
});

module.exports = Profile;
