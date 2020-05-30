import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { TouchableOpacity, TouchableWithoutFeedback } from "react-native-gesture-handler";
import { navigate } from "../navigationRef";
import notFound from "../../assets/img/not-found.png";

const SingleNews = ({
  image = { uri: notFound },
  description = "Nessuna descrizione",
  title = "Titolo non disponibile",
  content = "Contenuto non disponibile",
  author = 'Sconosciuto',
  url = 'non disponibile',
  id,
  source = { name: "Notizia" },
}) => {
  return (
    <TouchableWithoutFeedback
      onPress={() =>
        navigate("SingleNews", {
          image,
          description,
          title,
          content,
          author,
          url,
          id,
          source,
        })
      }
    >
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image source={image ? { uri: image } : notFound} style={styles.image} />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.title}>{title}</Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    flexDirection: "row",
    flex: 1,
    marginHorizontal: 16,
    marginTop: 30,
    borderBottomColor: "#EFEFF4",
    paddingBottom: 30,
  },
  textContainer: {
    flex: 1,
    paddingLeft: 15,
  },
  imageContainer: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 5,
  },
  title: {
    fontFamily: "bold",
  },
  description: {
    fontSize: 12,
  },
});

export default SingleNews;
