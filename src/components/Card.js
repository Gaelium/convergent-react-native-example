import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const deleteNote = async (id, setNotes) => {
  //create a note object

  //get the notes from async storage
  let notes = await AsyncStorage.getItem("notes");
  //if there are no notes, set an empty array
  if (!notes) {
    notes = [];
  } else {
    //if there are notes, set the notes to the notes variable
    notes = JSON.parse(notes);
  }
  //remove and replace the note
  notes = notes.filter((item) => item.id !== id);
  //save the notes to async storage
  await AsyncStorage.setItem("notes", JSON.stringify(notes));
  setNotes(notes);
  //navigate to the main page
};
/*Bring leads out and say
Hey, y'all great a job. The ideation of solutions seemed to go really well, with only a few minor hiccups.
Last semester I heard you guys wanted advice for your meetings,
and after listening in to your meeting I have some feedback based on what I saw
 1. It seems some members are not engaged when you guys are talking. This is normal and happens, but there are a few ways I can think
 of to minimize this
    When you want to interrupt members to talk about something be loud and bold, make sure they hear you and listen
 2. ...
 But again, y'all did a good job. Just some little things that will make your meetings even better */
const Card = ({ title, description, id, navigation, setNotes }) => (
  <TouchableOpacity
    style={styles.card}
    onPress={() =>
      navigation.navigate("Edit", {
        test: "hello",
        desc: description,
        name: title,
        key: id,
      })
    }
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
            onPress: () => deleteNote(id, setNotes),
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
