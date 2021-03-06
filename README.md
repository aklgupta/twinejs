#### (Original) twinejs

by Chris Klimas, Leon Arnott, Daithi O Crualaoich, Ingrid Cheung, Thomas Michael
Edwards, Micah Fitch, Juhana Leinonen, Michael Savich, and Ross Smith



# This Fork
Minor customization of the tool [twinejs](https://github.com/klembot/twinejs).
Uses "Twine 2.3.1 Web" as it's base
Intended to enhance the Twine Editor. Some changes might not be helpful in developing "Twine Stories", as the intended function here is to make a better editor, and hopefully use it for more than just Stories.

Also, I would mostly be focusing on the "Web" build, not the electron build, thus in cause of conflict, the web build will be given preference.

This project started as with very minor changes in a separate repo, [twinejs-custom](https://github.com/aklgupta/twinejs-custom), but soon the changes became too big and hacky, so I decided to form a proper fork.

## Changelog
### v0.4.1
- Added the missing CDN source for GitHub's `octokat` API wrapper
- GitHub Repo link, in the "GitHub" dialog, now opens in a new tab now
- In the dark theme, improved the color scheme for the `passage title` and `passage excerpt`

### v0.4
- Implemented GitHub Login
  - Password stored as plain text in local cache
  - Untested Release; Expect Bugs

### v0.3 - Migration of v0.1+v0.2- Incorporated the progress from [twinejs-custom](https://github.com/aklgupta/twinejs-custom)
- Changes migrated:
	- Added more colors for the tags
	- Tags colors are visible even in the dark theme
	- The default "gray" tag is shown in the passage block as well, like to other color tags
	- Changed the color for some tags
	- Changed the text color to black for light colored tags
	- Added visual indicators for special texts in the passage editor, these include:
		- Bold/Italic
		- Code
		- Collapsed
		- Hook
		- Link
	- Changes the text color for the above mentioned text types for the Dark Theme
	- Gave the `heading` class a more contrasting color in both themes to increase visibility
	- Drop-down list of tags when adding a new tag
	- "+Tag" button after all tags, in a new line
- Added *JQuery 3.4.1* & *Select2 4.0.7-rc.0* as dependencies
	- *Select2 4.0.6* had a bug that prevented it from closing when *focused*, thus opted for *v4.0.7-rc.0* instead
- Added *harlowe-3.0.2* as for some reason the scripts were referencing v3.0.2 but the fork included v3.0.0

## Screenshots
**Tag Colors**

![Tag Colors](../media/tag-colors.png?raw=true)



**Light Theme**

![Light Theme](../media/light-theme.png?raw=true)



**Dark Theme**

![Dark Theme](../media/dark-theme.png?raw=true)

**Tag Drop-down**

![Tag Drop-down](../media/tag-dropdown.png?raw=true)

**GitHub Option**

![GitHub Option](../media/github-option.png?raw=true)



## Reason/Description
- I believe that it will help editing much easier, and prevent error
- Allow more tags color, as the vanilla twine had very limited option
- Make the content in the editor more *visual*
- I use Twine to make quick flow chart for easy project management, instead of its intended use, thus these changes help my purpose, while should help others as well

## TO-DO
Priority Changes
- [Feature] Store GitHub Credentials in secure manner
- [Feature] Backup before exiting the story (both page unload & hash change)
- [Bug] The JS minification breaks the *web* and *web-cdn* releases. Need to find some other minification tools/disable minification

These will be very low-priority changes for me, and hence may never see light of the day. But if I ever get the chance/time to:
- [Feature] Support for keyboard shortcuts in the editor (Maybe even replace the current one with a rich-text editor, like ckeditor)
- [Feature] Add more tag colors
- [Feature] Option to set custom tag colors
- [Feature] Show Tag usage stats, with option to delete only unused tags
- [Feature] Style the Tag drop-down for the dark theme