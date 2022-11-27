import { useState, useContext, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { ConstContext, DataContext } from "../../App";
import { useParams, useNavigate } from "react-router-dom";


const ItemEdit = () => {
    const { id } = useParams();
    const { BACK_URI } = useContext(ConstContext);
    const { getOneItem, getAllItems } = useContext(DataContext);
    const { getAccessTokenSilently } = useAuth0();
    const navigate = useNavigate();

    const [ newItem, setNewItem ] = useState({});

    useEffect(()=>{
        const loadone = async () => {
            const itm = await getOneItem(parseInt(id));
            // console.log('itm: ', itm)
            setNewItem({...itm});
        }
        loadone();
    },[]);


    const handleChange = (e) => {
        e.preventDefault();
        let tmpItem = {...newItem};
        tmpItem[e.target.name] = e.target.value;
        setNewItem(tmpItem);
    }

    const handleSubmit = async (e) => {
        const accessToken = await getAccessTokenSilently();
        e.preventDefault();
        let tmpItem = {...newItem};
        tmpItem.received_by = typeof tmpItem.received_by !== "string"? tmpItem.received_by.id: tmpItem.received_by;
        tmpItem.facility_id = typeof tmpItem.facility_id !== "string"? tmpItem.facility_id.id: tmpItem.facility_id;
        tmpItem.destination_id = (typeof tmpItem.destination_id !== "string" && tmpItem.destination_id !== null)? tmpItem.destination_id.id: tmpItem.destination_id;
        // console.log(tmpItem);
        try {
            const response = await fetch(BACK_URI + '/api/v1/inventory/' + id, {
                method: 'PUT',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
                body: JSON.stringify(tmpItem)
            });
            if(response.ok){
                getAllItems();
                navigate('/items')
            }
        } catch (error) {
            console.error(error);
        }
    }

    return(
        <>
            <form onSubmit={handleSubmit}>
                <label htmlFor="facility_id">Facility</label>
                <input type='text' name="facility_id" id="facility_id" onChange={(e)=>{handleChange(e)}} placeholder="Facility Id" defaultValue={newItem?.facility_id?.id} />
                <label htmlFor="category">Category</label>
                <input type='text' name="category" id="category" onChange={(e)=>{handleChange(e)}} placeholder="Category" defaultValue={newItem?.category} />
                <label htmlFor="condition">Condition</label>
                <input type='text' name="condition" id="condition" onChange={(e)=>{handleChange(e)}} placeholder="Condition" defaultValue={newItem?.condition} />
                <label htmlFor="fair_market_value">Fair Market Value</label>
                <input type='text' name="fair_market_value" id="fair_market_value" onChange={(e)=>{handleChange(e)}} placeholder="Fair Market Value" defaultValue={newItem?.fair_market_value} />
                <label htmlFor="kids_served">Kids Served</label>
                <input type='text' name="kids_served" id="kids_served" onChange={(e)=>{handleChange(e)}} placeholder="Kids Served" defaultValue={newItem?.kids_served} />
                <label htmlFor="title_desc">Title / Description</label>
                <input type='text' name="title_desc" id="title_desc" onChange={(e)=>{handleChange(e)}} placeholder="Title / Description" defaultValue={newItem?.title_desc} />
                <label htmlFor="format">Format</label>
                <input type='text' name="format" id="format" onChange={(e)=>{handleChange(e)}} placeholder="Format" defaultValue={newItem?.format} />
                <label htmlFor="artist">Artist / Author</label>
                <input type='text' name="artist" id="artist" onChange={(e)=>{handleChange(e)}} placeholder="Artist / Author" defaultValue={newItem?.artist} />
                <label htmlFor="genre">Genre</label>
                <input type='text' name="genre" id="genre" onChange={(e)=>{handleChange(e)}} placeholder="Genre" defaultValue={newItem?.genre} />
                <label htmlFor="age_range">Age Range</label>
                <input type='text' name="age_range" id="age_range" onChange={(e)=>{handleChange(e)}} placeholder="Age Range" defaultValue={newItem?.age_range} />
                <label htmlFor="rating">Rating</label>
                <input type='text' name="rating" id="rating" onChange={(e)=>{handleChange(e)}} placeholder="Rating" defaultValue={newItem?.rating} />
                <label htmlFor="location">Location</label>
                <input type='text' name="location" id="location" onChange={(e)=>{handleChange(e)}} placeholder="Location" defaultValue={newItem?.location} />
                <label htmlFor="upc_code">UPC</label>
                <input type='text' name="upc_code" id="upc_code" onChange={(e)=>{handleChange(e)}} placeholder="UPC" defaultValue={newItem?.upc_code} />
                <label htmlFor="date_received">Date Received:</label>
                <input type='text' name="date_received" id="date_received" onChange={(e)=>{handleChange(e)}} placeholder="Date Receieved" defaultValue={newItem?.date_received} />
                <label htmlFor="date_shipped">Date Shipped</label>
                <input type='text' name="date_shipped" id="date_shipped" onChange={(e)=>{handleChange(e)}} placeholder="Date Shipped" defaultValue={newItem?.date_shipped} />
                <label htmlFor="destination_id">Destination ID</label>
                <input type='text' name="destination_id" id="destination_id" onChange={(e)=>{handleChange(e)}} placeholder="Destination ID" defaultValue={newItem?.destination_id?.id} />

                <input type="submit" value="Update Item" />
            </form>
        </>
    )
}

export default ItemEdit;





