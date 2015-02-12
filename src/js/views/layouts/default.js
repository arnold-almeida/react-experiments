var DefaultLayout = React.createClass({
	render: function() {
		return (
			<div className={appWrapperClassName}>
				<div className="device-silhouette">
					<ReactCSSTransitionGroup 
						transitionName={this.state.viewTransition.name} 
						transitionEnter={this.state.viewTransition.in} t
						ransitionLeave={this.state.viewTransition.out} 
						className="view-wrapper" component="div">
						{this.getCurrentView()}
					</ReactCSSTransitionGroup>
				</div>
			</div>
		);
	}
});

module.exports = DefaultLayout;
