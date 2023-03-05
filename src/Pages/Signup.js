import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";

function Signup() {
  //We don't use react navigation since our main page uses packageless navigation for signing in and signing up
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  async function handleSignup() {
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    try {
      // Create a new user account associated with the specified email address and password.
      await createUserWithEmailAndPassword(auth, email, password).then(() => {
        // Signed in
        // In your app you may want to do something with this user data
      });
    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <View style={styles.container}>
      <TextInput
        label="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
        style={styles.input}
      />
      <TextInput
        label="Password"
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
        style={styles.input}
      />
      <TextInput
        label="Confirm Password"
        value={confirmPassword}
        onChangeText={(text) => setConfirmPassword(text)}
        secureTextEntry
        style={styles.input}
      />
      <Button mode="contained" onPress={handleSignup}>
        Sign up
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  input: {
    marginBottom: 10,
  },
});

export default Signup;
