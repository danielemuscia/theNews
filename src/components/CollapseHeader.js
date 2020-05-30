import React, {useRef} from "react";
import { View, Text, Animated } from "react-native";

const H_MAX_HEIGHT = 150;
const H_MIN_HEIGHT = 80;
const H_SCROLL_DISTANCE = H_MAX_HEIGHT - H_MIN_HEIGHT;

const CollapseHeader = (props) => {
  const {scrollOffsetY} = props;

  const headerScrollHeight = scrollOffsetY.interpolate({
    inputRange: [0, H_SCROLL_DISTANCE],
    outputRange: [H_MAX_HEIGHT, H_MIN_HEIGHT],
    extrapolate: "clamp",
  });

  const headerTitleOpacity = scrollOffsetY.interpolate({
    inputRange: [0, H_SCROLL_DISTANCE],
    outputRange: [0, 1],
    extrapolate: "clamp",
  });

  const heroTitleOpacity = scrollOffsetY.interpolate({
    inputRange: [0, H_SCROLL_DISTANCE],
    outputRange: [1, 0],
    extrapolate: "clamp",
  });

  return (
    <Animated.View
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        height: headerScrollHeight,
        width: "100%",
        overflow: "hidden",
        zIndex: 999,
        // STYLE
        borderBottomColor: "#ffffff",
        borderBottomWidth: 2,
        padding: 10,
        backgroundColor: "white",
      }}
    >
      <Animated.Text
        style={{
          textAlign: "center",
          marginTop: 32,
          opacity: headerTitleOpacity,
          fontSize: 18,
          fontFamily: 'bold'
        }}
      >
        {props.title}
      </Animated.Text>
      <Animated.Text
        style={{
          position: "absolute",
          bottom: 16,
          left: 16,
          opacity: heroTitleOpacity,
          fontFamily: 'black',
          fontSize: 32
        }}
      >
        {props.title}
      </Animated.Text>
    </Animated.View>
  );
};

export default CollapseHeader;
