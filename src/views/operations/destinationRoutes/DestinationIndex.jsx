import { useContext } from "react";
import { DataContext, ConstContext } from "../../../App";
import { Link } from "react-router";


const DestinationIndex = () => {
    const { allDestinations } = useContext(DataContext);
    const { PATH_STRINGS } = useContext(ConstContext);

    return(
        <>
            <h1>Destinations by Name</h1>
            <ul>
                {allDestinations && allDestinations.map((item,idx) => {
                   return (<li key={idx}><Link to={`${PATH_STRINGS.ops_destinations}/show/${item.id}`}>
                        <span className="idx-left">{item.name}</span>
                    </Link></li>
                )})}
            </ul>
        </>
    )
}

export default DestinationIndex;

