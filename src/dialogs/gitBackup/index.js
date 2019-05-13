/*
A dialog which allows a user to import a story from a file. This returns a
promise resolving to the stories that were imported, if any.
*/

const Vue = require('vue');
const { deleteStory, importStory } = require('../../data/actions/story');
const importHTML = require('../../data/import');
const load = require('../../file/load');
const locale = require('../../locale');
const { thenable } = require('../../vue/mixins/thenable');

const {autobackup, fullbackup} = require('../../github');
const { setPref, resetPref } = require('../../data/actions/pref');
const Octokat = require('octokat');

module.exports = Vue.extend({
	template: require('./index.html'),

	data: () => ({
		/*
		Current state of the operation:
		   * `login`: waiting for the user to input login details
		   * `working`: working to verify the details
		   * `failure`: any failure (bad credentials, no repo, network issue)
		*/
		status: 'login',
	}),

	computed: {
		confirmClass() {
			if (this.toReplace.length === 0) {
				return 'primary';
			}

			return 'danger';
		},

		confirmLabel() {
			if (this.toReplace.length === 0) {
				return locale.say('Don\'t Replace Any Stories');
			}

			return locale.sayPlural(
				'Replace %d Story',
				'Replace %d Stories',
				this.toReplace.length
			);
		},

		errorMessage (){
			return this.failureMessage;
		},
	},
	
	ready() {
		this.status = (this.gitBackup) ? 'success' : 'login';
		if (this.immediateImport) {
			this.import(this.immediateImport);
		}
	},

	methods: {

		close() {
			if (this.$refs.modal) {
				this.$refs.modal.close();
			}
		},

		checkDetails(){
			this.status = 'working';
			let username = this.$els.username.value;
			let password = this.$els.password.value;
			let reponame = this.$els.reponame.value;

			var octo = new Octokat({
				username: username,
				password: password,
			});
			var repo = octo.repos(username, reponame);

			repo.contents('README.md').fetch()
			.then((info) => {
				// Save the details
				this.setPref("gitBackup", {username:username, password:password, reponame:reponame, lastbackup:0});
				// Commit all current sories
				this.backupAllStories();
				// Update dialogue box
				this.status = 'success';
			})
			.catch((err) => {
				console.log("error");
				console.log(err);
				this.status = 'failure';
			});
		},

		backupAllStories(){
			this.fullbackup(this.existingStories, this.gitBackup, this.setPref, autobackup);
		},

		backupLogOut(){
			this.resetPref("gitBackup");
			this.status = 'login';
		},

	},

	components: {
		'modal-dialog': require('../../ui/modal-dialog')
	},

	mixins: [thenable],

	vuex: {
		actions: {
			deleteStory,
			importStory,
			setPref,
			resetPref,
			autobackup,
			fullbackup,
		},

		getters: {
			gitBackup: state => state.pref.gitBackup,
			existingStories: state => state.story.stories
		}
	}
});
