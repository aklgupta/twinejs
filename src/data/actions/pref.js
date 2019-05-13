/*
Preference-related actions.
*/

module.exports = {
	setPref({ dispatch }, name, value) {
		dispatch('UPDATE_PREF', name, value);
	},
	resetPref({ dispatch }, name) {
		dispatch('RESET_PREF', name);
	},
};