import { useEffect } from "react";
import { useContext, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ConstContext, DataContext } from "../../../App";
import { useAuth0 } from "@auth0/auth0-react";


const DestinationShow = () => {
    const { id } = useParams();
    const { BACK_URI, PATH_STRINGS } = useContext(ConstContext);
    const { getAllDestinations, getOneDestination } = useContext(DataContext);
    const [ destination, setDestination ] = useState({});
    const { getAccessTokenSilently } = useAuth0();
    const navigate = useNavigate();

    useEffect(()=>{
        const loadone = async () => {
            const itm = await getOneDestination(parseInt(id));
            // console.log('itm: ', itm)
            setDestination({...itm});
        }
        loadone();
    },[]);

    const handleDelete = async () => {
        const accessToken = await getAccessTokenSilently();
        try {
            const response = await fetch(BACK_URI + '/api/v1/destination/' + id, {
                method: 'DELETE',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                }
            });
            if(response.ok){
                getAllDestinations();
                navigate(PATH_STRINGS.ops_destinations);
            }
        } catch (error) {
            console.error(error);
        }
    }

    return(
        <>
            {/* {item && ( */}
                <div className="show-container">                 
                    <div className="show-row"><span className="show-label">Name:</span>             <span className="show-data">{destination?.name}</span></div>
                    <div className="show-row"><span className="show-label">Address 1:</span>        <span className="show-data">{destination?.address1}</span></div>
                    <div className="show-row"><span className="show-label">Address 2:</span>        <span className="show-data">{destination?.address2}</span></div>
                    <div className="show-row"><span className="show-label">City:</span>             <span className="show-data">{destination?.city}</span></div>
                    <div className="show-row"><span className="show-label">State:</span>            <span className="show-data">{destination?.state}</span></div>
                    <div className="show-row"><span className="show-label">Country:</span>          <span className="show-data">{destination?.country}</span></div>
                    <div className="show-row"><span className="show-label">Zipcode:</span>          <span className="show-data">{destination?.zipcode}</span></div>
                    <div className="show-row"><span className="show-label">Contact Name:</span>     <span className="show-data">{destination?.contact_name}</span></div>
                    <div className="show-row"><span className="show-label">Contact Email:</span>    <span className="show-data">{destination?.contact_email}</span></div>
                    <div className="show-row"><span className="show-label">Contact Phone:</span>    <span className="show-data">{destination?.contact_phone}</span></div>

                    <div className="show-button-group">
                            <input type='button' value='EDIT' onClick={()=>navigate(`${PATH_STRINGS.ops_destinations}/edit/${id}`)} />
                            {/* <input type='button' value='DELETE' onClick={handleDelete} /> */}
                    </div>
                </div>
            {/* )} */}
        </>
    )
}

export default DestinationShow;

