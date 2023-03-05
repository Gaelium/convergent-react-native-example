import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  LogBox,
} from "react-native";
import React, { useState, useLayoutEffect } from "react";
import { useIsFocused } from "@react-navigation/native";
import Card from "../components/Card";
import { db } from "../firebaseConfig";
import { collection, onSnapshot, query } from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";

/*
  We can ignore these warnings since we don't care about state persistence (note data)
  when navigating back to the main page.
*/
LogBox.ignoreLogs([
  "Non-serializable values were found in the navigation state",
]);
const Notes = ({ user }) => {
  //usually this will automatically be passed through as a prop
  //however, on expo the simulator will sometimes mess up the navigation
  const navigation = useNavigation();

  const [notes, setNotes] = useState([]);
  const [email, setEmail] = useState(user.email);

  //Update when navigating back to this page
  const isFocused = useIsFocused();

  useLayoutEffect(() => {
    const q = query(collection(db, email));

    //get all notes from the database
    //and subscribe for updates
    onSnapshot(q, (querySnapshot) => {
      let notesToGet = [];
      querySnapshot.forEach((doc) => {
        notesToGet.push(doc.data());
      });
      setNotes(notesToGet);
    });

    //set the header right button
  }, [isFocused]);

  /*If there are no notes, return the image
    If there are notes, return a card for each note */
  return (
    <>
      {notes.length === 0 ? (
        <View style={styles.container}>
          <Image
            source={require("../../assets/mainvector.png")}
            style={styles.image}
          />
          <Text style={styles.text}>You have no notes</Text>
        </View>
      ) : (
        <View style={styles.containerCards}>
          {/*Map through the notes array and return a card for each note*/}
          {notes.map((note) => (
            <Card
              title={note.title}
              description={note.description}
              key={note.id}
              id={note.id}
              navigation={navigation}
              email={email}
            />
          ))}
        </View>
      )}

      <TouchableOpacity
        style={styles.addButton}
        onPress={() =>
          navigation.navigate("Add", { navigation: navigation, email: email })
        }
      >
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  containerCards: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    padding: 16,
  },
  image: {
    width: 150,
    height: 150,
  },
  text: {
    fontSize: 20,
    marginTop: 10,
    color: "#888",
  },
  addButton: {
    position: "absolute",
    bottom: 32,
    right: 32,
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#00B2FF",
    justifyContent: "center",
    alignItems: "center",
  },
  addButtonText: {
    fontSize: 32,
    color: "white",
  },
});
export default Notes;
