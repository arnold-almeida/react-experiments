/** @jsx React.DOM */

var constants               = require('./constants');
var core                    = require('./core');

var React                   = require('react/addons');
var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;
var classnames              = require('classnames');
var Touchstone              = require('touchstonejs');


// stats
var rAF = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame;

var FPSCounter = {
  start: function() {
    var stats = new Stats();
    stats.setMode(0); // 0: fps, 1: ms

    // Align top-left
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.top = '0px';
    stats.domElement.style.left = '0px';

    document.body.appendChild(stats.domElement);

    function tick() {
      stats.update();
      rAF(tick);
    }

    tick();
  }
};


var views = {

	// start
	'home': require('./views/examples/home'),

	// http://iamralpht.github.io/constraints/
	
	'2dscroller': require('./views/examples/2dscroller'),
	
};

var context = {
	isLoggedIn: false,
	data: {
		user: null
	},
}

var App = React.createClass({

	mixins: [
		Touchstone.createApp(views, context), // consider renaming to Touchstone.bootstrap(views)
	],

	getInitialState: function() {
		var initialState = {
			currentView: 'home',
			online: true,
			isNativeApp: (typeof cordova !== 'undefined')
		};

		return initialState;
	},

	getViewProps: function() {
		return {
			online: this.state.online
		};
	},
	
	gotoDefaultView: function() {
		this.showView('default', 'fade');
	},

	render: function() {
		var appWrapperClassName = classnames({
			'app-wrapper': true,
			'is-native-app': this.state.isNativeApp
		});

		return (
			<div className={appWrapperClassName}>
				<div className="device-silhouette">
					<ReactCSSTransitionGroup transitionName={this.state.viewTransition.name} transitionEnter={this.state.viewTransition.in} transitionLeave={this.state.viewTransition.out} className="view-wrapper" component="div">
						{this.getCurrentView()}
					</ReactCSSTransitionGroup>
				</div>
			</div>
		);
	}
});

function startApp() {
	
	React.render(<App />, document.getElementById('app'));

	FPSCounter.start();

}

function onDeviceReady() {
	StatusBar.styleDefault();
	startApp();
}

if (typeof cordova === 'undefined') {
	startApp();
} else {
	document.addEventListener('deviceready', onDeviceReady, false);
}
