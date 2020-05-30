import React, { useContext, useState, useEffect } from "react";
import { View, Text, Image, Alert, Share, StyleSheet } from "react-native";
import { Context as NewsContext } from "../context/NewsContext";
import * as WebBrowser from "expo-web-browser";
import Header from "../components/Header";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";

const SingleNewsScreen = ({ route, navigation }) => {
  const { image, title, content, author, url, source } = route.params;
  const { state, addToReadLater, deleteReadLaterNews } = useContext(
    NewsContext
  );
  const [hasBeenMarked, setHasBeenMarked] = useState(false);

  // const [url, setUrl] = useState(null)
  let news = state.news.find((item) => item.title === title);

  useEffect(() => {
    news
      ? state.readLater.find((item) =>
          item.title === news.title
            ? setHasBeenMarked(true)
            : setHasBeenMarked(false)
        )
      : setHasBeenMarked(true);
  }, []);
  const openWebPage = async () => {
    let result = await WebBrowser.openBrowserAsync(url);
    // setUrl({result})
  };

  const deleteActionReadLaterNews = () => {
    const newsInReadLater = state.readLater.find(
      (item) => item.title === route.params.title
    );
    try {
      deleteReadLaterNews(newsInReadLater, state.readLater);
    } catch (error) {
      Alert.alert(`Si è verificato un errore e l'articolo non è stato salvato`);
    }
    setHasBeenMarked(false);
  };

  const addActionReadLaterNews = () => {
    addToReadLater(route.params);
    setHasBeenMarked(true);
  };

  const share = async (url) => {
    try {
      const result = await Share.share({
        url,
      });

      if (result.action === Share.sharedAction) {
        Alert.alert(`L'articolo è stato condiviso con successo!`);
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      Alert.alert(
        `Ci sono stati dei problemi e non abbiamo potuto condividere l'articolo`
      );
    }
  };

  return (
    <>
      <Header
        title={source.name}
        goBack={() => navigation.goBack()}
        hasBeenMarked={hasBeenMarked}
        deleteReadLaterNews={deleteActionReadLaterNews}
        addToReadLater={addActionReadLaterNews}
        share={() => share(url)}
      />
      <ScrollView style={{ paddingHorizontal: 16, backgroundColor: "white" }}>
        <View style={styles.headlineContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.author}>Autore: {author}</Text>
        </View>
        <View style={styles.imageContainer}>
          <Image source={image ? { uri: image } : null} style={styles.image} />
        </View>
        <Text style={styles.content}>{content.split("[+")[0]}</Text>
        <TouchableOpacity style={styles.cta} onPress={() => openWebPage(url)}>
          <Text style={{ textAlign: "center", fontFamily: "bold" }}>
            LEGGI L'ARTICOLO COMPLETO
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 200,
    borderRadius: 5,
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
  headlineContainer: {
    marginBottom: 20,
  },
  title: {
    fontFamily: "bold",
    fontSize: 20,
  },
  author: {
    fontFamily: "light",
    color: "gray",
  },
  content: {
    fontFamily: "regular",
    color: "gray",
    marginVertical: 20,
  },
  cta: {
    borderWidth: 1,
    padding: 10,
    marginHorizontal: 40,
    marginVertical: 20,
    borderRadius: 5,
  },
});

export default SingleNewsScreen;
