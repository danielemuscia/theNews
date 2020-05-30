import React from "react";
import { View, Text, Alert } from "react-native";
import AuthForm from "../components/AuthForm";
import firebase from '../../Firebase'
const RecoverPasswordScreen = ({navigation}) => {
  const passwordReset = (emailAddress) => {
      firebase.auth().sendPasswordResetEmail(emailAddress).then(function() {
        Alert.alert('Hai appena ricevuto una mail con le istruzioni per il recupero della password. Controlla anche in spam.')
      }).catch(function(error) {
        Alert.alert('Non esiste nessun account registrato con la mail inserita.')
      });
  }

    return (
    <AuthForm
      textCta={"RECUPERA PASSWORD"}
      textHeadline="Password Dimenticata?"
      subtitle="Riceverai la nuova password via email"
      backButton={true}
      goBack={() => navigation.goBack()}
      hidePasswordInput={true}
      ctaAction={passwordReset}
    />
  );
};

export default RecoverPasswordScreen;
