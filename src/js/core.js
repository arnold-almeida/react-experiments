var Immutable = require('immutable');

global.AppContext = Immutable.Map({
	isLoggedIn: false,
	user: null,
});

module.exports = {

	mixins: {

		/**
		 * LocalStorage
		 */
		LocalStorage: require('react-localstorage'),

		
	}

};

