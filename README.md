Personal Start page
===================
My or yours custom browser start page. There're commercial solutions but I made my own. It does exactly what I want and nothing more.

It's free to use. You can use mine instance, or you can deploy your own.


Usage
-----
### My instance
1. Go to my instance's url. You can find it at github page description.
1. Install the extension.
1. Open settings and fill required fields.

### Your instance
1. Download the project.
1. Build it
   ```
   npm i
   npm run build
   ```
1. **Deployment:** 
    - _Web:_ Deploy `/dist` folder on your hosting and set the url as your new homepage in a browser.
    - _Extension:_
        1. Register new extension for firefox or chrome.
        1. Deploy the `/build/package.zip` file.
1. Follow the steps from "My instance" section but with your own instance.


Development
-----------
For using the weather, picture and other services you have to create `.env.local` file in project root. And provide the api keys.

Fill the file with constants:
```
VUE_APP_UNSPLASH_API_KEY=
VUE_APP_OPENWEATHERMAP_API_KEY=
```