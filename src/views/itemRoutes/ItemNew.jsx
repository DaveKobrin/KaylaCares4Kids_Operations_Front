import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ConstContext, DataContext } from "../../App";
import { useAuth0 } from "@auth0/auth0-react";


const ItemNew = () => {
    const { BACK_URI } = useContext(ConstContext);
    const { getAllItems } = useContext(DataContext);
    const { getAccessTokenSilently } = useAuth0();
    const navigate = useNavigate();
    const [ newItem, setNewItem ] = useState({});

    const handleChange = (e) => {
        e.preventDefault();
        // console.log('e: ', e);
        // console.log('newItem: ',newItem);
        let tmpItem = {...newItem};
        // console.log('tmpItem: ',tmpItem);
        tmpItem[e.target.name] = e.target.value;
        // console.log('tmpItem: ',tmpItem);
        setNewItem(tmpItem);
        // console.log('newItem: ',newItem);
    }

    const handleSubmit = async (e) => {
        const accessToken = await getAccessTokenSilently();
        e.preventDefault();
        let tmpItem = {...newItem};
        const payload = [];
        const quant = parseInt(tmpItem.quantity) || 1;
        delete tmpItem.quantity;
        for (let index = 0; index < quant; index++) {
            payload.push(tmpItem);
        }
        try {
            const response = await fetch(BACK_URI + '/api/v1/inventory/', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
                body: JSON.stringify(payload)
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
                <input type='text' name="facility_id" id="facility_id" onChange={(e)=>{handleChange(e)}} placeholder="Facility Id" />
                <label htmlFor="category">Category</label>
                <input type='text' name="category" id="category" onChange={(e)=>{handleChange(e)}} placeholder="Category" />
                <label htmlFor="condition">Condition</label>
                <input type='text' name="condition" id="condition" onChange={(e)=>{handleChange(e)}} placeholder="Condition" />
                <label htmlFor="fair_market_value">Fair Market Value</label>
                <input type='text' name="fair_market_value" id="fair_market_value" onChange={(e)=>{handleChange(e)}} placeholder="Fair Market Value" />
                <label htmlFor="kids_served">Kids Served</label>
                <input type='text' name="kids_served" id="kids_served" onChange={(e)=>{handleChange(e)}} placeholder="Kids Served" />
                <label htmlFor="title_desc">Title / Description</label>
                <input type='text' name="title_desc" id="title_desc" onChange={(e)=>{handleChange(e)}} placeholder="Title / Description" />
                <label htmlFor="format">Format</label>
                <input type='text' name="format" id="format" onChange={(e)=>{handleChange(e)}} placeholder="Format" />
                <label htmlFor="artist">Artist / Author</label>
                <input type='text' name="artist" id="artist" onChange={(e)=>{handleChange(e)}} placeholder="Artist / Author" />
                <label htmlFor="genre">Genre</label>
                <input type='text' name="genre" id="genre" onChange={(e)=>{handleChange(e)}} placeholder="Genre" />
                <label htmlFor="age_range">Age Range</label>
                <input type='text' name="age_range" id="age_range" onChange={(e)=>{handleChange(e)}} placeholder="Age Range" />
                <label htmlFor="rating">Rating</label>
                <input type='text' name="rating" id="rating" onChange={(e)=>{handleChange(e)}} placeholder="Rating" />
                <label htmlFor="location">Location</label>
                <input type='text' name="location" id="location" onChange={(e)=>{handleChange(e)}} placeholder="Location" />
                <label htmlFor="upc_code">UPC</label>
                <input type='text' name="upc_code" id="upc_code" onChange={(e)=>{handleChange(e)}} placeholder="UPC" />
                <label htmlFor="quantity">Quantity</label>
                <input type='text' name="quantity" id="quantity" defaultValue='1' onChange={(e)=>{handleChange(e)}} placeholder="Quantity" />

                <input type="submit" value="Add Item" />
            </form>
        </>
    )
}

export default ItemNew;

