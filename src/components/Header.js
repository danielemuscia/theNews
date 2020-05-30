import React from "react";
import { View, StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { FontAwesome } from "@expo/vector-icons";

const Header = (props) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={props.goBack} style={styles.buttonContainer}>
        <AntDesign name="left" size={24} color="black" />
      </TouchableOpacity>
      <View style={styles.actionsContainer}>
        {props.hasBeenMarked ? (
          <TouchableOpacity onPress={props.deleteReadLaterNews}>
            <FontAwesome
              name="bookmark"
              size={24}
              color="black"
              style={{ marginRight: 20 }}
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={props.addToReadLater}>
            <FontAwesome
              name="bookmark-o"
              size={24}
              color="black"
              style={{ marginRight: 20 }}
            />
          </TouchableOpacity>
        )}
        <TouchableOpacity onPress={props.share}>
          <AntDesign name="sharealt" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 80,
    backgroundColor: "white",
    paddingTop: 42,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  buttonContainer: {
    width: 50,
    backgroundColor: "white",
    marginTop: 3,
    paddingLeft: 10,
  },
  actionsContainer: {
    flexDirection: "row",
    marginRight: 16,
    marginTop: 3,
  },
});

export default Header;
