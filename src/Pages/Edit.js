import React, { useState, useLayoutEffect } from "react";
import { View, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";

const Edit = ({ navigation, route }) => {
  //This way uses route and navigation objects to pass in data
  const { key, name, desc, email } = route.params;
  const [title, setTitle] = useState(name);
  const [description, setDescription] = useState(desc);

  const saveNote = async ({ title, desc, email }) => {
    //create a note object
    const note = {
      id: key,
      title: title,
      description: desc,
    };
    //update the note in the database
    await setDoc(doc(db, email, key), note);
    //navigate to the main page
    navigation.navigate("Notes");
  };

  //set the header right button
  useLayoutEffect(() => {
    navigation.setOptions({
      //Add a checkmark button to save the note
      headerRight: () => (
        <TouchableOpacity
          onPress={() => {
            saveNote({ title: title, desc: description, email: email });
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
