import { useContext } from "react";
import { DataContext } from "../../App";
import { Link } from "react-router-dom";


const ItemIndex = () => {
    const { allItems } = useContext(DataContext)
    return(
        <>
            <h1>item index</h1>
            <ul>
                {allItems && allItems.map((item,idx) => {
                   return <li key={idx}><Link to={`/items/show/${item.id}`}>{item.title_desc}</Link></li>
                })}
            </ul>
        </>
    )
}

export default ItemIndex;

