// A Vuex module for working with application preferences. This is a bit
// over-engieneered, as it is designed to be compatible with Twine 2.0 data
// structures, where each preference had to have its own ID.

const $ = require("jquery");

let originalStates = {
	appTheme: 'light',
	defaultFormat: 'Harlowe',
	donateShown: false,
	firstRunTime: new Date().getTime(),
	lastUpdateSeen: '',
	lastUpdateCheckTime: new Date().getTime(),
	locale:
		window.navigator.userLanguage ||
		window.navigator.language ||
		window.navigator.browserLanguage ||
		window.navigator.systemLanguage ||
		'en-us',
	proofingFormat: 'Paperthin',
	welcomeSeen: false,
	gitBackup: null, /* Structure: {username:username, password:password, reponame:reponame, lastbackup:0} */
};

module.exports = {
	state: $.extend(true, {}, originalStates),
	// state: {
	// 	clickCounter: 5,
	// 	appTheme: 'light',
	// 	defaultFormat: 'Harlowe',
	// 	donateShown: false,
	// 	firstRunTime: new Date().getTime(),
	// 	lastUpdateSeen: '',
	// 	lastUpdateCheckTime: new Date().getTime(),
	// 	locale:
	// 		window.navigator.userLanguage ||
	// 		window.navigator.language ||
	// 		window.navigator.browserLanguage ||
	// 		window.navigator.systemLanguage ||
	// 		'en-us',
	// 	proofingFormat: 'Paperthin',
	// 	welcomeSeen: false,
	// },

	mutations: {
		UPDATE_PREF(state, name, value) {
			state[name] = value;
		},
		RESET_PREF(state, name) {
			state[name] = originalStates[name];
		},
	}
};
