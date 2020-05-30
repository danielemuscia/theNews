import React, { useState, useEffect, useContext, useRef } from "react";
import { View, Text, Animated } from "react-native";
import NewsList from "../components/NewsList";
import CollapseHeader from "../components/CollapseHeader";
import { Context as NewsContext } from "../context/NewsContext";
import {FontAwesome} from '@expo/vector-icons'

const ReadLaterScreen = () => {
  const { state } = useContext(NewsContext);
  const scrollOffsetY = useRef(new Animated.Value(0)).current;

  return (
    <>
    <CollapseHeader title="Articoli Salvati" scrollOffsetY={scrollOffsetY} />
    <View style={{ backgroundColor: "white", flex: 1, marginTop: 80 }}>
      {state.readLater.length > 0 ? (
        <NewsList
          data={state.readLater}
          noRefresh={true}
          scrollOffsetY={scrollOffsetY}
        />
      ) : (
        <View style={{ flex: 1, justifyContent: "center", paddingTop: 150, flexDirection: 'row' }}>
          <Text
            style={{
              alignSelf: "center",
              paddingHorizontal: 16,
              fontFamily: "regular",
              lineHeight: 30,
              textAlign: 'center'
            }}
          >
            {!state.dbErr ? 'Nessun articolo salvato. Torna alla pagina delle notizie e salva gli articoli che vuoi leggere con calma' : 'Al momento abbiamo un problema con il server. Riprova più tardi'}
          </Text>
        </View>
      )}
    </View>
    </>
  );
};

export default ReadLaterScreen;
