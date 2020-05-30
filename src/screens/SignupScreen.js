import React, { useContext, useState } from "react";
import { View, Text, Button, TextInput, Image, StyleSheet, TouchableOpacity, Linking } from "react-native";
import { AuthContext } from "../context/AuthContext";
import logo from "../../assets/img/theNews-cutted.png";
import AuthForm from '../components/AuthForm'
import loader from "../../assets/img/827.gif";

const SignupScreen = ({ navigation }) => {
  const { signup, ctaLoading } = useContext(AuthContext);

  return (
    <AuthForm
    textCta={ctaLoading ? 'CARICAMENTO...' : 'REGISTRATI'}
    textHeadline='Le News Sempre con Te'
    subtitle='Inizia creando un account'
    infoText='Hai già un account? Accedi'
    infoAction={() => navigation.push('Signin')}
    ctaAction={signup}
    />
  );
};

export default SignupScreen;
