var React = require('react/addons'),
	SetClass = require('classnames'),
	Tappable = require('react-tappable'),
	Navigation = require('touchstonejs').Navigation,
	Link = require('touchstonejs').Link,
	UI = require('touchstonejs').UI;

module.exports = React.createClass({

	propTypes: {
		txt: React.PropTypes.string,
		height: React.PropTypes.string,
		display: React.PropTypes.bool
	},

	getDefaultProps: function() {
		return {
			txt: '',
			messageType: 'warning',
			flash: false,
			flashTimeout: 5000,
			height: '30px',
		};
	},

	getInitialState: function() {
		return {
			display: false,
			renderCount: 0,
		}
	},

	show: function(msg) {

		this.props.txt = msg;

		this.setState({
			display: true
		});

		var self = this;

		if (this.props.flash) {
			setTimeout(function(){
				self.setState({
					display: false
				});				
			}, this.props.flashTimeout);
		};
	},

	handleDismiss: function() {
		this.setState({display: false});
	},

	render: function() {

		var inlineStyle = {display : 'none'};

		if (this.state.display === true) {
			inlineStyle = {display : 'block'};			
		}

		this.state.renderCount++;
		console.log('UIKit.Message.rendered('+ this.state.renderCount +')');

		var alertbarClass = SetClass({
			'alertbar': true,
			'primary': this.props.messageType === 'primary',
			'success': this.props.messageType === 'success',
			'warning': this.props.messageType === 'warning',
			'danger': this.props.messageType === 'danger'
		});

		return (
			<div class="{uiMessageClass}" onClick={this.handleDismiss} component="div" style={inlineStyle}>
				<UI.FlexBlock height={this.props.height} className={alertbarClass}>
					<div className="alertbar-text">{this.props.txt}</div>
				</UI.FlexBlock>
			</div>
		);
	}
});
