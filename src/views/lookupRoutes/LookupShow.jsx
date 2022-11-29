import { useEffect } from "react";
import { useContext, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ConstContext, DataContext } from "../../App";
import { useAuth0 } from "@auth0/auth0-react";


const LookupShow = () => {
    const { id } = useParams();
    const { BACK_URI } = useContext(ConstContext);
    const { getAllLookupItems, getOneLookupItem } = useContext(DataContext);
    const [ lookupItem, setLookupItem ] = useState({});
    const { getAccessTokenSilently } = useAuth0();
    const navigate = useNavigate();

    useEffect(()=>{
        const loadone = async () => {
            const itm = await getOneLookupItem(parseInt(id));
            // console.log('itm: ', itm)
            setLookupItem({...itm});
        }
        loadone();
    },[]);

    const handleDelete = async () => {
        const accessToken = await getAccessTokenSilently();
        try {
            const response = await fetch(BACK_URI + '/api/v1/lookup/' + id, {
                method: 'DELETE',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                }
            });
            if(response.ok){
                getAllLookupItems();
                navigate('/lookup');
            }
        } catch (error) {
            console.error(error);
        }
    }

    return(
        <>
            {/* {item && ( */}
                <div className="show-container">                 
                    <div className="show-row"><span className="show-label">Description:</span>          <span className="show-data">{lookupItem?.description}</span></div>
                    <div className="show-row"><span className="show-label">Fair Market Value:</span>    <span className="show-data">{lookupItem?.value}</span></div>
                    <div className="show-row"><span className="show-label">Kids Served:</span>          <span className="show-data">{lookupItem?.kids_served}</span></div>

                    <div className="show-button-group">
                            <input type='button' value='EDIT' onClick={()=>navigate(`/lookup/edit/${id}`)} />
                            <input type='button' value='DELETE' onClick={handleDelete} />
                    </div>
                </div>
            {/* )} */}
        </>
    )
}

export default LookupShow;

