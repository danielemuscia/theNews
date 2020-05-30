import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import AuthForm from "../components/AuthForm";

const SignupScreen = ({ navigation }) => {
  const { signup, ctaLoading } = useContext(AuthContext);

  return (
    <AuthForm
      textCta={ctaLoading ? "CARICAMENTO..." : "REGISTRATI"}
      textHeadline="Le News Sempre con Te"
      subtitle="Inizia creando un account"
      infoText="Hai già un account? Accedi"
      infoAction={() => navigation.push("Signin")}
      ctaAction={signup}
    />
  );
};

export default SignupScreen;
