import { useContext } from "react";
import { DataContext } from "../../App";
import { Link } from "react-router-dom";


const DestinationIndex = () => {
    const { allDestinations } = useContext(DataContext)
    return(
        <>
            <h1>Destinations by Name</h1>
            <ul>
                {allDestinations && allDestinations.map((item,idx) => {
                   return (<li key={idx}><Link to={`/destination/show/${item.id}`}>
                        <span className="idx-left">{item.name}</span>
                    </Link></li>
                )})}
            </ul>
        </>
    )
}

export default DestinationIndex;

