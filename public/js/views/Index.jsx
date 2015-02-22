"use strict";

var React = require('react');
var Reflux = require('reflux');
var IndexItem = require('./IndexItem.jsx');

var IndexActions = require('../actions/GeneralActions');
var IndexStore = require('../stores/GeneralStore');

var Index = React.createClass({
	mixins: [Reflux.connect(IndexStore, "indexes")],
	getInitialState: function () {
		return {indexes: []};
	},

	componentDidMount: function () {
		IndexActions.load();
	},

	render: function () {
		var indexes = this.state.indexes.map(function(i){
			return (
				<IndexItem name={i.name} _id={i._id} key={i._id} />
			);
		});
		return (
			<div>
				<table className="index-table pure-table pure-table-horizontal">
					{indexes}
				</table>
				<form className="pure-form" onSubmit={this.onSubmit}>
					<fieldset>
						<input type="text" ref="name" />
						<input type="submit" className="submit pure-button pure-button-primary" value="Submit" />
					</fieldset>
				</form>
			</div>
		);
	},
	onSubmit: function (e) {
		e.preventDefault();
		var name = this.refs.name.getDOMNode().value;
		IndexActions.add({name: name});
		this.refs.name.getDOMNode().value = "";
	},
	
});

module.exports = Index;
