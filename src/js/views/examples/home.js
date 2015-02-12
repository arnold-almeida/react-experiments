/** @jsx React.DOM */

var React = require('react'),
	SetClass = require('classnames'),
	Tappable = require('react-tappable'),
	Navigation = require('touchstonejs').Navigation,
	Link = require('touchstonejs').Link,
	UI = require('touchstonejs').UI;

var core = require('../../core');

var Immutable = require('immutable');

module.exports = React.createClass({

	render: function() {
		
		return (

			<UI.FlexLayout className={this.props.viewClassName}>
				<UI.FlexBlock>
					<Link to="2dscroller" viewTransition="show-from-right" component="div">
						<UI.Feedback iconKey="ion-beer" iconType="primary" header="Sandbox" text="Welcome." />
					</Link>
				</UI.FlexBlock>
			</UI.FlexLayout>
		);
	}
});

