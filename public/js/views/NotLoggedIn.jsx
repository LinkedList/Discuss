/* jshint node:true */
"use strict";
var React = require('react');

var NotLoggedIn = React.createClass({
	render: function () {
		return (
			<ul className="right pure-menu-list">
				<li className="pure-menu-item">
					<a className="link" href="/login" title="Login"><i className="signin"></i> Sign in</a>
				</li>
			</ul>
		);
	}});

module.exports = NotLoggedIn;
