import { Auth0Provider } from "@auth0/auth0-react";
import React from "react";

export const Auth0ProviderWithConfig = ({ children }) => {
  const domain = process.env.REACT_APP_AUTH0_DOMAIN;
  const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;
  const redirectUri = process.env.REACT_APP_AUTH0_CALLBACK_URL;
  const audience = process.env.REACT_APP_AUTH0_AUDIENCE;

  if (!(domain && clientId && redirectUri && audience)) {
    console.error('missing const from auth provider');
    console.error({domain});
    console.error({clientId});
    console.error({redirectUri});
    console.error({audience});
    return null;
  }

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      redirectUri={redirectUri}
      audience={audience}
    >
      {children}
    </Auth0Provider>
  );
};
