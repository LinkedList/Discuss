"use strict";

var React = require('react');
var Reflux = require('reflux');
var IndexActions = require('../actions/IndexActions');

var IndexItem = React.createClass({
	getInitialState: function () {
		return {
			edit:false
		};
	},
	render: function () {
		var _this = this;
		var edit = function(name) {
			return (
				<form className="pure-form">
					<input className="index-edit" ref="edit" type="text" defaultValue={name} onKeyDown={_this.onKeyDown}/>
				</form>
			);
		};
		return (
				<tr>
					<td onClick={this.onEdit}>
						{this.state.edit ? edit(this.props.name) : this.props.name}
					</td>
					<td className="delete-button">
						<input type="button" className="pure-button" value="X" onClick={this.onDelete} />
					</td>
				</tr>
		);
	},

	onEdit: function (e) {
		this.setState({edit: true});
	},

	onDelete: function(e) {
		e.preventDefault();
		IndexActions.deleteIndex(this.props._id);
	},

	componentDidUpdate: function (a, b) {
		if(this.state.edit) {
			var editNode = this.refs.edit.getDOMNode();
			editNode.setSelectionRange(0, editNode.value.length);
			editNode.focus();
		}
	},
	
	onKeyDown: function (e) {
		if(e.keyCode === 13) {
			var name = this.refs.edit.getDOMNode().value;
			IndexActions.updateIndex(this.props._id, name);
			this.setState({edit: false});
		} else if(e.keyCode === 27) {
			this.setState({edit: false});
		}
	}
});

module.exports = IndexItem;
