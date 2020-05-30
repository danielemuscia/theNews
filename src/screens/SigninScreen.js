import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import AuthForm from "../components/AuthForm";

const SigninScreen = ({ navigation }) => {
  const { signin, ctaLoading } = useContext(AuthContext);

  return (
    <AuthForm
      textCta={ctaLoading ? "CARICAMENTO..." : "ACCEDI"}
      textHeadline="Bentornato"
      subtitle={null}
      infoText="Hai dimenticato la password?"
      infoAction={() => navigation.push("RecoverPassword")}
      ctaAction={signin}
      backButton={true}
      goBack={() => navigation.goBack()}
    />
  );
};

export default SigninScreen;
