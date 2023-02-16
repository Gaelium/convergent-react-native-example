import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import React, { useState, useLayoutEffect } from "react";
import { useIsFocused } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/MaterialIcons";
import Card from "../components/Card";

const deleteAll = async (setNotes) => {
  Alert.alert(
    "Delete All Messages?",
    "You will not be able to undo this action",
    [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "OK",
        onPress: () => {
          AsyncStorage.clear();
          setNotes([]);
        },
      },
    ],
    { cancelable: false }
  );
};

const Main = ({ navigation }) => {
  const [notes, setNotes] = useState([]);
  const [unsubscribe, setUnsubscribe] = useState(null);

  //Update when navigating back to this page
  const isFocused = useIsFocused();
  const getNotes = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("notes");
      return jsonValue != null ? JSON.parse(jsonValue) : [];
    } catch (e) {
      console.log(e);
    }
  };

  useLayoutEffect(() => {
    getNotes().then((notes) => setNotes(notes));
    setUnsubscribe(unsubscribe);

    //set the header right button
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => {
            deleteAll(setNotes);
          }}
          style={{ marginRight: 10 }}
        >
          <Icon name="delete" size={30} style={{ color: "#000" }}></Icon>
        </TouchableOpacity>
      ),
    });
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
          {notes.map((note) => (
            <Card
              title={note.title}
              description={note.description}
              key={note.id}
              id={note.id}
              navigation={navigation}
              //Pass through the update state function
              setNotes={setNotes}
            />
          ))}
        </View>
      )}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate("Add")}
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
    fontFamily: "Roboto",
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
export default Main;
