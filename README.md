Browser's new tab page extension
================================
Your own start page. Simplify your new tab and home page in your favorite web browser.

The project is designed to be fully open-sourced and developed by the users. You're more than welcome to contribute with a fix, new translation, or a new feature.  You can always describe the problem or idea in a new ticket. The community will then take care of its resolution.

If you don't want to use the public instance you can always run your own. The how-to guide can be found below.

### ⭐Features
The design is strongly inspired by Windows Spotlight (= Windows 10 lock screen) - picture and time with a few additional features.

- Weather
- Time
- Quick links
- Pictures provided by [Unsplash](https://unsplash.com/) - the largest community-driven photo gallery. Select a topic and your background picture will change every 30 minutes
- Notes from favorite service [Todoist](https://todoist.com/)
- Works offline. All data are stored locally and are only refreshed once the internet re-connected
- Secure and personal - no personal data are collected. Your privacy stays protected
- Fully Open-Sourced and forever free

### Public instance
Firefox addon: [My Spotlight](https://addons.mozilla.org/en-US/firefox/addon/my-spotlight)


Contribution
------------
This project is fully community-driven. Any ideas for improvement or help with the development are highly regarded.

### How to report a bug or new idea?
1. Go to the issues tab and click "New Issue"
2. Describe the problem or your new idea as thoroughly as possible. Add screenshots or sketches if you can
3. Submit the issue
4. The issue will be triaged and resolved by the community

### How to contribute with a code?
1. Go to issues and choose the one you want to implement, ideally any that was already triaged
2. Once you're done implementing the issue create a pull request to the `master` branch. It will be reviewed and subsequently merged

If you have any questions for the author or community raise the question directly in the issue.


Development
-----------
1. Download the project.
2. Create `.env.local` from `.env.local.template` and copy your own API keys for [Unsplash](https://unsplash.com/) and [OpenWeatherMap](https://openweathermap.org/) services. This step is optional if you don't want to develop weather and background picture features
3. Run the local dev server
   ```shell
   npm i
   npm run serve
   ```

### To build the web version
1. Run `npm run build`
2. All generated files can be found in the `dist` folder

### To build your extension instance
1. Edit the name in `public/manifest.json` and the name and version in `package.json`
2. Run `npm run generate`
3. All generated files can be found in the `packages` folder
4. Register new extension for [Firefox](https://addons.mozilla.org/en-US/developers/addons) or [Chrome](https://chrome.google.com/webstore/category/extensions) and upload zip files from the previous folder