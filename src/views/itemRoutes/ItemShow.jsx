import { useEffect } from "react";
import { useContext, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ConstContext, DataContext } from "../../App";
import { useAuth0 } from "@auth0/auth0-react";


const ItemShow = () => {
    const { id } = useParams();
    const { BACK_URI } = useContext(ConstContext);
    const { getAllItems, getOneItem } = useContext(DataContext);
    const [ item, setItem ] = useState({});
    const { getAccessTokenSilently } = useAuth0();
    const navigate = useNavigate();

    useEffect(()=>{
        const loadone = async () => {
            const itm = await getOneItem(parseInt(id));
            // console.log('itm: ', itm)
            setItem({...itm});
        }
        loadone();
    },[]);

    const handleDelete = async () => {
        const accessToken = await getAccessTokenSilently();
        try {
            const response = await fetch(BACK_URI + '/api/v1/inventory/' + id, {
                method: 'DELETE',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                }
            });
            if(response.ok){
                getAllItems();
                navigate('/items');
            }
        } catch (error) {
            console.error(error);
        }
    }

    return(
        <>
            {/* {item && ( */}
                <div className="show-container">                 
                    <div className="show-row"><span className="show-label">Title / Description:</span>  <span className="show-data">{item?.title_desc}</span></div>
                    <div className="show-row"><span className="show-label">Format:</span>               <span className="show-data">{item?.format}</span></div>
                    <div className="show-row"><span className="show-label">Artist:</span>               <span className="show-data">{item?.artist}</span></div>
                    <div className="show-row"><span className="show-label">Genre:</span>                <span className="show-data">{item?.genre}</span></div>
                    <div className="show-row"><span className="show-label">Age Range:</span>            <span className="show-data">{item?.age_range}</span></div>
                    <div className="show-row"><span className="show-label">Rating:</span>               <span className="show-data">{item?.rating}</span></div>
                    <div className="show-row"><span className="show-label">UPC Code:</span>             <span className="show-data">{item?.upc_code}</span></div>
                    <div className="show-row"><span className="show-label">Condition:</span>            <span className="show-data">{item?.condition}</span></div>
                    <div className="show-row"><span className="show-label">Location:</span>             <span className="show-data">{item?.location}</span></div>
                    <div className="show-row"><span className="show-label">Category:</span>             <span className="show-data">{item?.category}</span></div>
                    <div className="show-row"><span className="show-label">Fair Market Value:</span>    <span className="show-data">{item?.fair_market_value}</span></div>
                    <div className="show-row"><span className="show-label">Kids Served:</span>          <span className="show-data">{item?.kids_served}</span></div>
                    <div className="show-row"><span className="show-label">Date Received:</span>        <span className="show-data">{item?.date_received}</span></div>
                    <div className="show-row"><span className="show-label">Received By:</span>          <span className="show-data">{item?.received_by?.name}</span></div>
                    <div className="show-row"><span className="show-label">Facility:</span>             <span className="show-data">{item?.facility_id?.name}</span></div>
                    <div className="show-row"><span className="show-label">Date Shipped:</span>         <span className="show-data">{item?.date_shipped}</span></div>
                    <div className="show-row"><span className="show-label">Destination:</span>          <span className="show-data">{item?.destination_id?.name}</span></div>

                    <div className="show-button-group">
                            <input type='button' value='EDIT' onClick={()=>navigate(`/items/edit/${id}`)} />
                            <input type='button' value='DELETE' onClick={handleDelete} />
                    </div>
                </div>
            {/* )} */}
        </>
    )
}

export default ItemShow;

