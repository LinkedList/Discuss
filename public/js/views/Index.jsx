"use strict";

var React = require('react');
var Reflux = require('reflux');
var IndexStore = require('../stores/IndexStore');
var IndexActions = require('../actions/IndexActions');
var IndexItem = require('./IndexItem.jsx');

var Index = React.createClass({
	mixins: [Reflux.ListenerMixin],
	getInitialState: function () {
		return {indexes: []};
	},

	indexes: function (indexes) {
		this.setState({
			indexes: indexes
		});
	},

	componentDidMount: function () {
		this.listenTo(IndexStore, this.indexes);
		IndexActions.loadIndexes();
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
		IndexActions.submitIndex(name);
		this.refs.name.getDOMNode().value = "";
	},
	
});

module.exports = Index;
