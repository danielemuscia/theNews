import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import logo from "../../assets/img/theNews-cutted.png";
import { Entypo, AntDesign } from "@expo/vector-icons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";

const AuthForm = ({
  textCta,
  textHeadline,
  subtitle,
  infoText,
  infoAction,
  ctaAction,
  backButton,
  goBack,
  hidePasswordInput,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hidePass, setHidePass] = useState(true);

  const emailAndPassValidated = password.length >= 8 && email.includes("@");
  return (
    <KeyboardAwareScrollView style={{ backgroundColor: "white" }}>
      <View style={{ backgroundColor: "white", height: 80, paddingTop: 42 }}>
        {backButton && (
          <TouchableOpacity style={styles.backContainer} onPress={goBack}>
            <AntDesign name="left" color="black" size={24} />
          </TouchableOpacity>
        )}
      </View>
      <View
        style={{ backgroundColor: "white", flex: 1, justifyContent: "center" }}
      >
        <View style={{ width: "100%", justifyContent: "flex-end" }}>
          <Image source={logo} style={styles.img} resizeMode="contain" />
        </View>
        <Text style={styles.headline}>{textHeadline}</Text>
        <Text style={styles.info}>{subtitle}</Text>
        <View style={styles.inputContainer}>
          <View style={styles.textInput}>
            <TextInput
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              textContentType="emailAddress"
              autoCapitalize="none"
              autoCorrect={false}
              autoCompleteType="email"
              keyboardType="email-address"
              style={{ flex: 1, paddingBottom: 3, fontFamily: "regular" }}
              selectionColor="black"
            />
          </View>
          {!hidePasswordInput && (
            <View style={styles.textInput}>
              <TextInput
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                autoCapitalize="none"
                autoCorrect={false}
                textContentType="username" //Avoid Password suggestions in ios
                secureTextEntry={hidePass}
                autoCompleteType="off"
                style={{ flex: 1, fontFamily: "regular", paddingBottom: 3 }}
                selectionColor="black"
              />
              {password.length > 0 && (
                <TouchableOpacity onPress={() => setHidePass(!hidePass)}>
                  <Entypo
                    name={hidePass ? "eye" : "eye-with-line"}
                    size={24}
                    color="black"
                  />
                </TouchableOpacity>
              )}
            </View>
          )}
        </View>
        <View style={{ height: 20, marginTop: -12 }}>
          {password.length > 0 && password.length < 8 && (
            <Text style={{ ...styles.info, marginVertical: 0 }}>
              La password deve contenere almeno 8 caratteri
            </Text>
          )}
        </View>
        <TouchableOpacity
          style={
            emailAndPassValidated || hidePasswordInput
              ? styles.cta
              : { ...styles.cta, backgroundColor: "#dedede" }
          }
          onPress={
            emailAndPassValidated || hidePasswordInput
              ? () => ctaAction(email, password)
              : null
          }
          activeOpacity={emailAndPassValidated || hidePasswordInput ? 0 : 1}
        >
          <Text
            style={{ textAlign: "center", color: "white", fontFamily: "bold" }}
          >
            {textCta}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ alignSelf: "center" }} onPress={infoAction}>
          <Text style={styles.info}>{infoText}</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  img: {
    height: 70,
    width: 200,
    alignSelf: "center",
  },
  headline: {
    fontFamily: "bold",
    fontSize: 24,
    textAlign: "center",
    marginVertical: 20,
  },
  info: {
    textAlign: "center",
    fontFamily: "regular",
    color: "gray",
    marginVertical: 20,
  },
  inputContainer: {
    width: "66%",
    justifyContent: "center",
    alignSelf: "center",
  },
  textInput: {
    borderBottomWidth: 1,
    marginVertical: 20,
    padding: 10,
    paddingBottom: 0,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cta: {
    padding: 10,
    width: "66%",
    alignSelf: "center",
    marginVertical: 20,
    borderRadius: 5,
    backgroundColor: "black",
  },
  backContainer: {
    marginTop: 3,
    paddingLeft: 16,
    alignSelf: "flex-start",
    backgroundColor: "white",
  },
});

export default AuthForm;
