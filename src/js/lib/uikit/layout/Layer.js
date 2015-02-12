var React  = require('react/addons');

module.exports = React.createClass({

	displayName: 'UIKitLayer',

	

	getDefaultProps: function() {
		return {
			className: '',
			height: ''
		};
	},

	render: function() {

		var className = classnames((this.props.scrollable ? 'springy-scrolling' : ''), this.props.className);
		var inlineStyle = {};

		// set height on blocks if provided
		if (this.props.height) {
			inlineStyle.height = this.props.height;
			// otherwise stretch to take up space
		} else {
			inlineStyle.WebkitBoxFlex = '1';
			inlineStyle.WebkitFlex = '1';
			inlineStyle.MozBoxFlex = '1';
			inlineStyle.MozFlex = '1';
			inlineStyle.MsFlex = '1';
			inlineStyle.flex = '1';
		}

		// allow blocks to be scrollable
		if (this.props.scrollable) {
			inlineStyle.overflowY = 'auto';
			inlineStyle.WebkitOverflowScrolling = 'touch';
		}

		return <div className={className} style={inlineStyle}>{this.props.children}</div>;
	}
});

