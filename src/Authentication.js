import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { Button } from "react-native-paper";

function Authentication({ navigation }) {
  return (
    <View style={styles.container}>
      <Button
        mode="contained"
        style={styles.button}
        labelStyle={styles.label}
        onPress={() => navigation.navigate("Sign In")}
      >
        Sign In
      </Button>
      <Button
        mode="contained"
        style={styles.button}
        labelStyle={styles.label}
        onPress={() => navigation.navigate("Sign Up")}
      >
        Sign Up
      </Button>
    </View>
  );
}

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    width: width * 0.9,
    borderRadius: 20,
    marginVertical: 10,
  },
  label: {
    color: "#fff",
  },
});

export default Authentication;
