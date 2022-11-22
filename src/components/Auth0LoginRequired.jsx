import { withAuthenticationRequired } from '@auth0/auth0-react';
import { PageLoader } from '.';

const Auth0LoginRequired =  ({ component }) => {
    const Component = withAuthenticationRequired(component,{
        onRedirecting: () => (
            <div className="page-layout">
                <PageLoader />
            </div>
        )
    });
    return <Component />
}

export default Auth0LoginRequired;