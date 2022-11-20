import { useAuth0 } from "@auth0/auth0-react";

const CallbackView = () => {
    const { error } = useAuth0();

    if (error) {
        return (
            <div>
                <h1>Error</h1>
                <p>{error.message}</p>
            </div>
        );
    }
    return <><h1>Callback View</h1></>
}

export default CallbackView;
