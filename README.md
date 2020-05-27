# Indus web

## Pre-requisites

1. Create a firebase project.
2. Add a web application to it.
   _Ref: https://firebase.google.com/docs/projects/learn-more#setting_up_a_firebase_project_and_adding_apps_
3. Obtain the config file for your app.
   _Ref: https://support.google.com/firebase/answer/7015592_

4. Create a file `firebase.js` under `src/`. Copy contents from `firebase.example.js` and replace the keys with the keys obtained from firebase.

## Development

In the project directory run: `yarn start`

##### Runs the app in the development mode.

##### Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Build and deployment

`yarn build` -
Builds the app for production to the `build` folder.
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.

##### The app is ready to be deployed!

##### The app uses firebase hosting and is already initialized with hosting.

`firebase serve --only hosting` - Serves the build folder in local.
`firebase deploy` - Deploys the app to firebase.

Reference: https://dev.to/sama/deploying-a-react-app-to-firebase-2lda (Deploying a react app to firebase.)
