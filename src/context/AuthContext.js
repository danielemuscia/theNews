import React, { useState } from "react";
import firebase from "firebase";

export const AuthContext = React.createContext();

export const AuthProvider = (props) => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [ctaLoading, setCtaLoading] = useState(false);

  const checkAuth = () => {
    setLoading(true);
    firebase.auth().onAuthStateChanged((user) => {
      if (user != null) {
        //User is authenticated
        setIsSignedIn(true);
      } else {
        //User is not authenticated
        setIsSignedIn(false);
      }
      setLoading(false);
    });
  };

  const signin = async (email, password) => {
    setCtaLoading(true);
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
    } catch (error) {
      alert(error);
    }
    setCtaLoading(false);
  };

  const signup = async (email, password) => {
    setCtaLoading(true);
    try {
      await firebase.auth().createUserWithEmailAndPassword(email, password);
    } catch (error) {
      alert(error);
    }
    setCtaLoading(false);
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
      value={{
        signin,
        signout,
        signup,
        checkAuth,
        isSignedIn,
        loading,
        ctaLoading,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
