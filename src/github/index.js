/**
 Saves data to a file. This appears to the user as if they had clicked a link
 to a downloadable file in their browser. If no failure method is specified,
 then this will show a UI notification when errors occur.

 @module backup
 @param {Object} story
**/

'use strict';

const {publishStory, publishStoryWithFormat} = require('../data/publish');
const {loadFormat} = require('../data/actions/story-format');
// const { setPref, resetPref } = require('../data/actions/pref');
const Octokat = require('octokat');

const appInfo = require('../data/store/app-info').state;


module.exports = {
	autobackup: async (story, store, gitBackup, setPref, singleUpload = false) => {
		// set up vars
		let filename = story.name + '.html';
		let username = gitBackup.username;
		let password = gitBackup.password;
		let reponame = gitBackup.reponame;
		let lastUpdateUploaded = gitBackup.lastbackup;

		// Setup git/Octakat refs
		var octo = new Octokat({
			username: username,
			password: password,
		});
		var repo = octo.repos(username, reponame);

		async function upload(){
			// The latest local version is already uploaded
			if(Date.parse(story.lastUpdate) <= lastUpdateUploaded){
				console.log("Skipping backup. No changes since last backup.")
				return;
			}
			console.log("Attemping a bakup");
	
	
			// Create the file and upload it
			loadFormat(store, story.storyFormat, story.storyFormatVersion)
			.then(format => {
				// Create the formatted html file
				let content = publishStoryWithFormat(appInfo, story, format);
	
				// Fetch detials, if file exists
				repo.contents(filename).fetch()
				.then((info) => {
					// If it exsits, try updating the file
					repo.contents(filename)
					.add({sha:info.sha,"message":"Update the story","content":btoa(content)})
					.then((_)=>{
						// We can save the current sha here as it is returned in the promise,
						// however, in case someone edits the files from some other srouce,
						// it that will not work, as a sha will be created
	
						// Update the "gitBackup" state var
						gitBackup.lastbackup = lastUpdateUploaded = Date.parse(story.lastUpdate);
						setPref("gitBackup", gitBackup);
						console.log("Updated back-up of: " + story.name);
					})
					.catch((err) => {console.log(err)});
				})
				.catch((err) => {
					console.log(err);
	
					// If the file doesn't exist. Try creating a new one
					repo.contents(filename)
					.add({"message":"Adding a new story","content":btoa(content)})
					.then((_)=>{
						// Update the "gitBackup" state var
						gitBackup.lastbackup = lastUpdateUploaded = Date.parse(story.lastUpdate);
						setPref("gitBackup", gitBackup);
						console.log("Created first back-up of: " + story.name);
					})
					.catch((err) => {console.log(err)});
				});
			});// loadFormat
	
		}
		

		function sleep(ms) {
			return new Promise(resolve => setTimeout(resolve, ms));
		}

		function pageChanged(){
			pageUnchanged = false;
			window.removeEventListener('hashchange', pageChanged);
			console.log("Exiting backup loop for: " + story.name);
		}
		if(!singleUpload) window.addEventListener('hashchange', pageChanged);

		
		let pageUnchanged = true;
		while(pageUnchanged){
			upload();
			if(singleUpload) break;
			console.log("looping");


			// wait
			await sleep(60000);	// 1 min(s)
			// await sleep(300000);	// 5 min(s)
			// await sleep(3000);	// 3secs
		}
	},

	fullbackup: async function(store, stories, gitBackup, setPref, autobackup){
		if(stories && stories.length > 0){
			for(let i=0; i < stories.length; i++){
				let story = stories[i];
				console.log(story.name);
				autobackup(story, store, gitBackup, setPref, true);
			}
		}
	},
}