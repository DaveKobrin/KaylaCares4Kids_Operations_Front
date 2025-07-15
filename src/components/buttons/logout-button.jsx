import { useAuth0 } from "@auth0/auth0-react";
import React, { useContext } from "react";
import { ConstContext } from "../../App";

const LogoutButton = () => {
  const { logout } = useAuth0();
  const { LOGOUT_URL } = useContext(ConstContext);

  const handleLogout = () => {
    logout({
      returnTo: LOGOUT_URL,
    });
  };

  return (
    <button className="button__logout" onClick={handleLogout}>
      Log Out
    </button>
  );
};

export default LogoutButton;
