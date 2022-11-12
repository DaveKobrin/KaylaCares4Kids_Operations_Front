import { useNavigate } from "react-router-dom";

const NotFound = () => {

    const navigate = useNavigate();
    setTimeout(()=>{navigate('/')}, 2000);
    return (
        <section>
            <h1>404 Page Not Found</h1>
        </section>
    );
}

export default NotFound;
