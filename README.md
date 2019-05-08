### (Original) twinejs

by Chris Klimas, Leon Arnott, Daithi O Crualaoich, Ingrid Cheung, Thomas Michael
Edwards, Micah Fitch, Juhana Leinonen, Michael Savich, and Ross Smith



# This Fork
Minor customization of the tool [twinejs](https://github.com/klembot/twinejs).
Uses "Twine 2.3.1 Web" as it's base
Intended to enhance the Twine Editor. Some changes might not be helpful in delevoping "Twine Stories", as the intented function here is to make a better editor, and hopefully use it for more than just Stories.

Also, I would mostly be focusing on the "Web" build, not the electron build, thus in cause of conflict, the web build will be given preference.

This project started as with very minor changes in a separate repo, [twinejs-custom](https://github.com/aklgupta/twinejs-custom), but soont he changes became too big and hacky, so I decided to form a proper fork.

## Reason/Description
- I believe that it will help editing much easier, and prevent error
- Allow more tags color, as the vanilla twine had very limited option
- Make the content in the editor more *visual*
- I use Twine to make quick flow chart for easy project management, instead of its intended use, thus these changes help my purpose, while should help others as well

## TO-DO
Priority Changes
- Migrate the already amde changes from [twinejs](https://github.com/klembot/twinejs)
- Add support for a cloud-based auto-backup mechanism (Current candidate include Git Repo)

These will be very low-priority changes for me, and hence may never see light of the day. But if I ever get the chance/time to:
- Support for keyboard shortcuts in the editor (Maybe even replace the current one with a rich-text editor, like ckeditor)
- Add more tag colors
- Option to set custom tag colors
- Show Tag usage stats, with option to delete only unused tags
- Style the Tag drop-down for the dark theme
