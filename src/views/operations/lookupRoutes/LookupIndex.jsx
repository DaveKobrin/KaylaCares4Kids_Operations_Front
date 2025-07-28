import { useContext } from "react";
import { DataContext, ConstContext } from "../../../App";
import { Link } from "react-router";


const LookupIndex = () => {
    const { allLookupItems } = useContext(DataContext);
    const { PATH_STRINGS } = useContext(ConstContext);
    return(
        <>
            <h1>item index</h1>
            <ul>
                <li><span className="idx-left">Description</span>
                    <span className="idx-center">Fair Market Value</span>
                    <span className="idx-right">Kids Served</span></li>
                {allLookupItems && allLookupItems.map((item,idx) => {
                    return (<li key={idx}><Link to={`${PATH_STRINGS.ops_lookups}/show/${item.id}`}>
                        <span className="idx-left">{item.description}</span>
                        <span className="idx-center">{item.value}</span>
                        <span className="idx-right">{item.kids_served}</span>
                    </Link></li>
                )})}
            </ul>
        </>
    )
}

export default LookupIndex;

