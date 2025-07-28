import { useEffect } from "react";
import { useContext, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { ConstContext, DataContext } from "../../../App";
import { useAuth0 } from "@auth0/auth0-react";


const FacilityShow = () => {
    const { id } = useParams();
    const { BACK_URI, PATH_STRINGS } = useContext(ConstContext);
    const { getAllFacilities, getOneFacility } = useContext(DataContext);
    const [ facility, setFacility ] = useState({});
    const { getAccessTokenSilently } = useAuth0();
    const navigate = useNavigate();

    useEffect(()=>{
        const loadone = async () => {
            const itm = await getOneFacility(parseInt(id));
            // console.log('itm: ', itm)
            setFacility({...itm});
        }
        loadone();
    },[]);

    const handleDelete = async () => {
        const accessToken = await getAccessTokenSilently();
        try {
            const response = await fetch(BACK_URI + '/api/v1/facility/' + id, {
                method: 'DELETE',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                }
            });
            if(response.ok){
                getAllFacilities();
                navigate(PATH_STRINGS.ops_facilities);
            }
        } catch (error) {
            console.error(error);
        }
    }

    return(
        <>
            {/* {item && ( */}
                <div className="show-container">                 
                    <div className="show-row"><span className="show-label">Name:</span>         <span className="show-data">{facility?.name}</span></div>
                    <div className="show-row"><span className="show-label">Address 1:</span>    <span className="show-data">{facility?.address1}</span></div>
                    <div className="show-row"><span className="show-label">Address 2:</span>    <span className="show-data">{facility?.address2}</span></div>
                    <div className="show-row"><span className="show-label">City:</span>         <span className="show-data">{facility?.city}</span></div>
                    <div className="show-row"><span className="show-label">State:</span>        <span className="show-data">{facility?.state}</span></div>
                    <div className="show-row"><span className="show-label">Country:</span>      <span className="show-data">{facility?.country}</span></div>
                    <div className="show-row"><span className="show-label">Zipcode:</span>      <span className="show-data">{facility?.zipcode}</span></div>
                    <div className="show-row"><span className="show-label">Contact:</span>      <span className="show-data">{facility?.contact_id?.name}</span></div>

                    <div className="show-button-group">
                            <input type='button' value='EDIT' onClick={()=>navigate(`${PATH_STRINGS.ops_facilities}/edit/${id}`)} />
                            {/* <input type='button' value='DELETE' onClick={handleDelete} /> */}
                    </div>
                </div>
            {/* )} */}
        </>
    )
}

export default FacilityShow;

