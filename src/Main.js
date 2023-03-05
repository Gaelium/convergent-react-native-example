import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Notes from "./Pages/Notes";
import Add from "./Pages/Add";
import Edit from "./Pages/Edit";
import Signin from "./Pages/Signin";
import Signup from "./Pages/Signup";
import Authentication from "./Authentication";
import React, { useEffect, useState } from "react";
import { auth } from "./firebaseConfig";

const Stack = createNativeStackNavigator();

export default function Main() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      //you can do something with the user here if you want
      //I save the user in state so I can pass it down to the notes page
      //Since we use the email as the name of the collection
      setUser(user);
      setLoggedIn(user ? true : false);
    });
    return unsubscribe;
  }, []);

  return (
    <Stack.Navigator>
      {/*packageless navigation example, where this only shows if the user isn't logged in */}
      {!loggedIn ? (
        <>
          <Stack.Screen
            name="Authentication"
            component={Authentication}
            options={{
              headerTitle: "Register or Sign in",
            }}
          />
          <Stack.Screen
            name="Sign In"
            component={Signin}
            options={{
              headerTitle: "Sign in",
            }}
          />
          <Stack.Screen
            name="Sign Up"
            component={Signup}
            options={{
              headerTitle: "Sign Up",
            }}
          />
        </>
      ) : (
        <>
          <Stack.Screen
            name="Notes"
            //This is how you pass state down from the parent to the child
            children={() => <Notes user={user} />}
            options={{
              headerTitle: "Notes",
            }}
          />
          <Stack.Screen
            name="Add"
            component={Add}
            options={{
              headerTitle: "Add Note",
            }}
          />
          <Stack.Screen
            name="Edit"
            component={Edit}
            options={{
              headerTitle: "Edit Note",
            }}
          />
        </>
      )}
    </Stack.Navigator>
  );
}
