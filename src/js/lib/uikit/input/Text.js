/**
 * [React description]
 * 
 * @changeLog 1.0.1 	If no "id" prop is specified default to using 
 * 						the provided "name" prop
 * @changeLog 1.0.2 	If no "ref" prop is specified default to using 
 * 						the provided "name" prop
 */
var React = require('react/addons'),
	_ = require('underscore'),
	classnames = require('classnames');

String.prototype.toCamel = function(){
	return this.replace(/(\-[a-z])/g, function($1){return $1.toUpperCase().replace('-','');});
};

module.exports = React.createClass({

	propTypes: {
		className: React.PropTypes.string,
		id: React.PropTypes.string,
		onChange: React.PropTypes.func,
		type: React.PropTypes.string,
		label: React.PropTypes.string,
		pattern: React.PropTypes.string,
		placeholder: React.PropTypes.string,
		ref: React.PropTypes.string,
		readonly: React.PropTypes.bool,
		disabled: React.PropTypes.bool,
		first: React.PropTypes.bool,
		errorMessage: React.PropTypes.string
	},

	getDefaultProps: function() {
		return {
			type: 'text',
			readonly: false,
		};
	},

	/**
	 * @todo - Move to a UIKit mixin ??
	 */
	addErrorMessage: function(msg) {

		this.props.errorMessage = msg;

		this.setState({
			errors: true
		});
	},

	getInitialState: function() {
		return {
			errors: false,
			focused: false	// alias blur ?
		}
	},

	render: function() {

		var className = classnames(this.props.className, {
			'has-errors': this.state.errors,
			'list-item': true,
			'field-item': true,
			'is-first': this.props.first,
			'u-selectable': this.props.disabled
		});

		var id = (_.isUndefined(this.props.id)) ? this.props.name : console.log('Unable to determine id');
		var ref = (_.isUndefined(this.props.ref)) ? this.props.name : console.log('Unable to determine ref');

		var renderInput = this.props.readonly ? (
			<div id={this.props.id} className="field u-selectable">{this.props.value}</div>
		) : (
			<input id={id} ref={ref} disabled={this.props.disabled} type={this.props.type} pattern={this.props.pattern} name={this.props.name} value={this.props.value} defaultValue={this.props.defaultValue} onChange={this.props.onChange} className="field" placeholder={this.props.placeholder} />
		);

		return (
			<label className={className}>
				<div className="item-inner">
					<div className="field-label">{this.props.label}</div>
					<div className="field-control">
						{renderInput}
						{this.props.children}
					</div>
				</div>
			</label>
		);
	}
});
