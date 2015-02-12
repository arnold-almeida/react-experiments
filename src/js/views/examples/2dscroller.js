var React = require('react');
var UI    = require('touchstonejs').UI;
var UIKit = require('react-uikit');

module.exports = React.createClass({

	componentDidMount: function() {
		var viewport = this.refs.viewport.getDOMNode();

		var scrollingExample = {
		    // Create two nested boxes. The outer box is a clip, and the inner box is an image to
		    // pan around.
		    box: {
		        id: "clip",
		        className: "clip",
		        children: {
		            id: "image",
		            className: "image"
		        }
		    },
		    constraints: [
		        // The clip is going to be 320x300.
		        "clip.left == 0",
		        "clip.top == 0",
		        "clip.right == 320",
		        "clip.bottom == 300",
		        // Specify the bounds of the image and hint its position; the image is 320x100.
		        // We don't really need to specify the constraint strengths here, but it helps
		        // to make clearer which constraints we expect to be violated.
		        "image.right == image.left + 320 !strong",
		        "image.bottom == image.top + 100 !strong",
		        "image.left == 0 !weak",
		        "image.top == 0 !weak"
		    ],
		    motionConstraints: [
		        // Ensure that the image stays within the clip with springs.
		        // XXX: We can't yet express motion constraints relative to other linear variables; would rather use clip.right instead of "300" here.
		        [ "image.left", "<=", 0 ],
		        [ "image.top", "<=", 0 ],
		        [ "image.bottom", ">=", 50],
		        [ "image.right", ">=", 50]
		    ],
		    manipulators: [
		        // Create a manipulator that listens for events on the box "clip" and manipulates
		        // "image.left" and "image.top" for the x and y components of a pan.
		        { box: "clip", x: "image.left", y: "image.top" }
		    ]
		}

		UIKit.Slalom.Serialization.assemble(scrollingExample, viewport);
	},

	render: function() {

		return (
			<UI.FlexLayout className={this.props.viewClassName}>
				<UI.Headerbar label="2D Scroller">
					<UI.HeaderbarButton showView="home" viewTransition="reveal-from-right" label="Back" icon="ion-chevron-left" />
				</UI.Headerbar>
				<div ref="viewport"></div>
			</UI.FlexLayout>
		);
	}
});
