import { useAuth0 } from "@auth0/auth0-react";
import React, { useContext } from "react";
import { ConstContext } from "../../App";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();
  const { PATH_STRINGS } = useContext(ConstContext);

  const handleLogin = async () => {
    await loginWithRedirect({
      prompt: "login",
      appState: {
        returnTo: `${PATH_STRINGS.ops_users}/login`,
      },
    });
  };

  return (
    <button className="button__login" onClick={handleLogin}>
      Log In
    </button>
  );
};

export default LoginButton;
