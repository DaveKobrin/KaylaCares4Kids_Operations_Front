import { useContext } from "react";
import { DataContext, ConstContext } from "../../../App";
import { Link } from "react-router";


const ItemIndex = () => {
    const { allItems } = useContext(DataContext);
    const { PATH_STRINGS } = useContext(ConstContext);

    return(
        <>
            <h1>item index</h1>
            <ul>
                {allItems && allItems.map((item,idx) => {
                   return <li key={idx}><Link to={`${PATH_STRINGS.ops_items}/show/${item.id}`}>{item.title_desc}</Link></li>
                })}
            </ul>
        </>
    )
}

export default ItemIndex;

