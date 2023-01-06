import { useContext } from "react";
import { DataContext } from "../../App";
import { Link } from "react-router-dom";


const FacilityIndex = () => {
    const { allFacilities } = useContext(DataContext)
    return(
        <>
            <h1>Facilities by Name</h1>
            <ul>
                {allFacilities && allFacilities.map((item,idx) => {
                   return (<li key={idx}><Link to={`/facility/show/${item.id}`}>
                        <span className="idx-left">{item.name}</span>
                    </Link></li>
                )})}
            </ul>
        </>
    )
}

export default FacilityIndex;

