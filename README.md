# React Native Notes App with Firebase Backend

This is an example React Native app that demonstrates how to use Firebase as a backend to store and retrieve notes. The app allows users to create, read, update, and delete notes, and uses Firebase's Firestore database to store these notes.

### Getting Started
To get started with the app, follow these steps:

- Clone this repo using `git clone https://github.com/Gaelium/convergent-react-native-example.git`
- Move to the appropriate directory: `cd convergent-react-native-example`.
- Run `npm install` to install dependencies.
- Create a new Firebase project and enable the Firestore Database and Authentication by Email.
- Copy the Firebase configuration object into `src/firebaseConfig.js`.
- Run `npm start` and choose your desired Expo simulator

### Features
The app includes the following features:

- Authentication: Users can sign up and log in.
- Notes: Users can create, read, update, and delete notes.
- Cross-device Use: Changes made to notes are automatically synchronized across devices in real-time.


### Demo
![bad76ba7c4a5a0c9c27bff1033eb056c](https://user-images.githubusercontent.com/38620265/222974540-0dbcf864-662f-4b17-a601-4903c639b9ac.gif)

### Aside
There is a second branch called `asyncstorage` that uses React Native AsyncStorage instead of Firebase to store notes
