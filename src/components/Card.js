import React from "react";
import { Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";

const deleteNote = async (id, email) => {
  await deleteDoc(doc(db, email, id));
};

//Each note is mapped onto a card
const Card = ({ title, description, id, navigation, email }) => (
  <TouchableOpacity
    style={styles.card}
    //Navigates to the edit page, passing the note's title, description, and id
    onPress={() =>
      navigation.navigate("Edit", {
        test: "hello",
        desc: description,
        name: title,
        key: id,
        email: email,
      })
    }
    //Shows an alert, asking the user if they want to delete the note
    onLongPress={() => {
      Alert.alert(
        "Delete Message?",
        "You will not be able to undo this action",
        [
          {
            text: "Cancel",
            style: "cancel",
          },
          {
            text: "OK",
            onPress: () => deleteNote(id, email),
          },
        ],
        { cancelable: false }
      );
    }}
  >
    <Text style={styles.title} numberOfLines={1}>
      {title}
    </Text>
    <Text style={styles.description} numberOfLines={3}>
      {description}
    </Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  card: {
    width: "45%",
    height: 120,
    backgroundColor: "white",
    padding: 16,
    marginBottom: 16,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 3,
    marginRight: "2.5%",
    marginLeft: "2.5%",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
    height: 60,
    overflow: "hidden",
  },
});

export default Card;
