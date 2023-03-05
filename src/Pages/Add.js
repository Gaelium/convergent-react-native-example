import React, { useState, useLayoutEffect } from "react";
import { View, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { db } from "../firebaseConfig";
import { doc, setDoc } from "firebase/firestore";

const Add = (props) => {
  //This way uses just props, instead of route and navigation like edit
  //Both are equally valid ways to pass in data
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const saveNote = async ({ title, desc, email }) => {
    //generate a random id
    const id = Math.floor(Math.random() * 1000000000).toString();
    //create a note object
    const note = {
      id: id,
      title: title,
      description: desc,
    };
    //add the note to the database
    await setDoc(doc(db, email, id), note);
    //navigate to the main page
    props.navigation.navigate("Notes");
  };

  //set the header right button
  useLayoutEffect(() => {
    props.navigation.setOptions({
      //Add a checkmark button to save the note
      headerRight: () => (
        <TouchableOpacity
          onPress={() => {
            saveNote({
              title: title,
              desc: description,
              email: props.route.params.email,
            });
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

export default Add;
