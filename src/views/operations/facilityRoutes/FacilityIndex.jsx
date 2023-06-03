import { useContext } from "react";
import { DataContext, ConstContext } from "../../../App";
import { Link } from "react-router-dom";


const FacilityIndex = () => {
    const { allFacilities } = useContext(DataContext);
    const { PATH_STRINGS } = useContext(ConstContext);

    return(
        <>
            <h1>Facilities by Name</h1>
            <ul>
                {allFacilities && allFacilities.map((item,idx) => {
                    return (<li key={idx}><Link to={`${PATH_STRINGS.ops_facilities}/show/${item.id}`}>
                        <span className="idx-left">{item.name}</span>
                    </Link></li>
                )})}
            </ul>
        </>
    )
}

export default FacilityIndex;

