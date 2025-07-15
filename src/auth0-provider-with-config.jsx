import { Auth0Provider } from "@auth0/auth0-react";
import React from "react";
// import { useNavigate } from "react-router-dom";

export const Auth0ProviderWithConfig = ({ children }) => {
  // const navigate = useNavigate();
  const domain = import.meta.env.VITE_AUTH0_DOMAIN;
  const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID;
  const redirectUri = import.meta.env.VITE_AUTH0_CALLBACK_URL;
  // const redirectUri = window.location.origin;
  const audience = import.meta.env.VITE_AUTH0_AUDIENCE;
  // const onRedirectCallback = (appState) => {
  //   navigate(appState?.returnTo || window.location.pathname);
  // }

  if (!(domain && clientId && redirectUri && audience)) {
    console.error('missing const from auth provider');
    // console.error({domain});
    // console.error({clientId});
    // console.error({redirectUri});
    // console.error({audience});
    return (<h2>ERROR: Bad Environment</h2>);
  }

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      redirectUri={redirectUri}
      audience={audience}
      // onRedirectCallback={onRedirectCallback}
    >
      {children}
    </Auth0Provider>
  );
};
