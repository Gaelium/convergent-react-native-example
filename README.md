# React Native Notes App with Firebase Backend

This is an example React Native app that demonstrates how to use Firebase as a backend to store and retrieve notes. The app allows users to create, read, update, and delete notes, and uses Firebase's Firestore database to store these notes.

### Getting Started
To get started with the app, follow these steps:

- Clone this repo using git clone https://github.com/yourusername/react-native-notes-app.git
- Move to the appropriate directory: cd react-native-notes-app.
- Run npm install to install dependencies.
- Create a new Firebase project and enable the Firestore Database and Authentication by Email.
- Copy the Firebase configuration object into src/firebaseConfig.js.
- Run npm start and choose your desired Expo simulator

### Features
The app includes the following features:

- Authentication: Users can sign up, log in, and log out.
- Notes: Users can create, read, update, and delete notes.
- Cross-device Use: Changes made to notes are automatically synchronized across devices in real-time.
