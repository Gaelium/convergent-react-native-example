import React, { useState, useLayoutEffect } from "react";
import { View, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Edit = ({ navigation, route }) => {
  const { key, name, desc } = route.params;
  const [title, setTitle] = useState(name);
  const [description, setDescription] = useState(desc);

  const saveNote = async ({ title, desc }) => {
    //create a note object
    const note = {
      id: key,
      title: title,
      description: desc,
    };
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
    notes = notes.filter((item) => item.id !== key);
    //push to the front
    notes.unshift(note);
    //save the notes to async storage
    await AsyncStorage.setItem("notes", JSON.stringify(notes));
    //navigate to the main page
    navigation.navigate("Main");
  };

  //set the header right button
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => {
            saveNote({ title: title, desc: description });
          }}
          style={{ marginRight: 10 }}
        >
          <Icon name="check" size={30} style={{ color: "#000" }}></Icon>
        </TouchableOpacity>
      ),
    });
  }, [title, description]);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.titleInput}
        placeholder="Title"
        value={title}
        onChangeText={(title) => setTitle(title)}
      />
      <TextInput
        style={styles.descriptionInput}
        placeholder="Description"
        value={description}
        onChangeText={(desc) => setDescription(desc)}
        multiline
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  titleInput: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  descriptionInput: {
    fontSize: 16,
  },
});

export default Edit;
