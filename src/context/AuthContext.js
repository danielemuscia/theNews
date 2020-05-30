import React, { useState } from "react";
import firebase from "firebase";
import { navigate } from "../navigationRef.js";
import { Alert } from "react-native";

export const AuthContext = React.createContext();

export const AuthProvider = (props) => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [ctaLoading, setCtaLoading] = useState(false)

  const checkAuth = () => {
    setLoading(true);
    firebase.auth().onAuthStateChanged((user) => {
      if (user != null) {
        console.log("We are authenticated now!");
        setIsSignedIn(true);
      } else {
        setIsSignedIn(false);
        console.log('is not authenticated')
      }
      setLoading(false);
      // Do other things
    });
  };

  const signin = async (email, password) => {
    setCtaLoading(true)
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
    } catch (error) {
      alert(error);
    }
    setCtaLoading(false)
  };

  const signup = async (email, password) => {
    setCtaLoading(true)
    try {
      await firebase.auth().createUserWithEmailAndPassword(email, password);
    } catch (error) {
      alert(error);
    }
    setCtaLoading(false)
  };

  const signout = () => {
    firebase
      .auth()
      .signOut()
      .then(function () {
        setIsSignedIn(false);
      })
      .catch(function (error) {
        // An error happened.
        alert(error);
      });
  };

  return (
    <AuthContext.Provider
      value={{ signin, signout, signup, checkAuth, isSignedIn, loading, ctaLoading }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
