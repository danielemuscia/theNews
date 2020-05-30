import React, { useContext, useEffect, useRef } from "react";
import {
  View,
  Text,
  Animated,
} from "react-native";
import { Context as NewsContext } from "../context/NewsContext";
import NewsList from "../components/NewsList";
import CollapseHeader from "../components/CollapseHeader";
import { SimpleLineIcons } from "@expo/vector-icons";

const NewsListScreen = () => {
  const { getNews, getReadLater, state } = useContext(NewsContext);
  const scrollOffsetY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    getNews();
    getReadLater();
  }, []);

  return (
    <>
      <CollapseHeader
        scrollOffsetY={scrollOffsetY}
        title={!state.apiErr ? "Ultime Notizie" : "Ops 😅"}
      />
      <View style={{ backgroundColor: "white", marginTop: 80, flex:1 }}>
        {!state.apiErr ? (
          <NewsList
            onRefresh={getNews}
            data={state.news}
            scrollOffsetY={scrollOffsetY}
          />
        ) : (
          <View
            style={{
              backgroundColor: "white",
              flex: 1,
              justifyContent: "center",
              paddingTop: 150,
            }}
          >
            <SimpleLineIcons
              name="cup"
              size={96}
              color="black"
              style={{ alignSelf: "center", paddingBottom: 40 }}
            />
            <Text
              style={{
                alignSelf: "center",
                paddingHorizontal: 16,
                fontFamily: "regular",
                textAlign: "center",
                lineHeight: 30,
              }}
            >
              {
                "Sembra che i nostri giornalisti non siano disponibili.\nRiprova più tardi"
              }
            </Text>
          </View>
        )}
      </View>
    </>
  );
};

export default NewsListScreen;
