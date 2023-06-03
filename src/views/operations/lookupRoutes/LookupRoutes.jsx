import { Routes, Route } from "react-router-dom";
import { LookupIndex, LookupNew, LookupShow, LookupEdit, NotFound } from '../..';
import { DataContext, UserContext, ConstContext } from '../../../App';
import { useState, useContext, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import './lookup_styles.css';

const LookupRoutes = () => {
    const { getAccessTokenSilently } = useAuth0();
    // const { currUser } = useContext(UserContext);
    const { BACK_URI } = useContext(ConstContext); 
    const [allLookupItems, setAllLookupItems] = useState([]);


    const getOneLookupItem = async (id) => {
        const accessToken = await getAccessTokenSilently();
        // console.log(accessToken)
        try {
            const response = await fetch(BACK_URI+'/api/v1/lookup/' + id, {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                }});
            if (response.ok) {
                const jsonResponse = await response.json();
                const {data} = jsonResponse;
                return data;
            } else
                return false;
        } catch (error) {
            console.error(error);
        }
    }

    const getAllLookupItems = async () => {
        const accessToken = await getAccessTokenSilently();
        // console.log('accessToken: ', accessToken);
        try {
            const response = await fetch(BACK_URI+'/api/v1/lookup/', {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                }});
            if (response.ok) {
                const jsonResponse = await response.json();
                const {data} = jsonResponse;
                setAllLookupItems([...data]);
            } else
                return false;
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => { getAllLookupItems() }, [])

    return (
        <DataContext.Provider value={{allLookupItems, setAllLookupItems, getAllLookupItems, getOneLookupItem}}>
            <Routes>
                <Route path='/' element={<LookupIndex />} />
                <Route path='new' element={<LookupNew />} />
                <Route path='show/:id' element={<LookupShow />} />
                <Route path='edit/:id' element={<LookupEdit />} />
                <Route path='*' element={<NotFound />} />
            </Routes>
        </DataContext.Provider>
    )
}

export default LookupRoutes;