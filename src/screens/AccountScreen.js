import React, { useContext } from "react";
import { View, Text } from "react-native";
import { AuthContext } from "../context/AuthContext";
import { TouchableOpacity } from "react-native-gesture-handler";

const AccountScreen = () => {
  const { signout } = useContext(AuthContext);
  return (
    <View
      style={{ backgroundColor: "white", flex: 1, justifyContent: "center" }}
    >
      <TouchableOpacity
        style={{
          borderWidth: 1,
          alignSelf: "center",
          padding: 10,
          backgroundColor: "black",
          width: "70%",
          borderRadius: 5,
        }}
        onPress={signout}
      >
        <Text
          style={{ color: "white", fontFamily: "bold", textAlign: "center" }}
        >
          LOGOUT
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default AccountScreen;
