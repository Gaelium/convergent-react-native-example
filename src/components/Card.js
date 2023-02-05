import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const Card = ({ title, description, id, navigation }) => (
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
  >
    <Text style={styles.title}>{title}</Text>
    <Text style={styles.description} numberOfLines={4}>
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
