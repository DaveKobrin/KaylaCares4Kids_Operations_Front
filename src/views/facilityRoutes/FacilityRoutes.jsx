import { Routes, Route } from "react-router-dom";
import { FacilityIndex, FacilityNew, FacilityShow, FacilityEdit, NotFound } from '..';
import { DataContext, UserContext, ConstContext } from '../../App';
import { useState, useContext, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import './facility_styles.css';

const FacilityRoutes = () => {
    const { getAccessTokenSilently } = useAuth0();
    // const { currUser } = useContext(UserContext);
    const { BACK_URI } = useContext(ConstContext); 
    const [allFacilities, setAllFacilities] = useState([]);

    const getAllUsers = async () => {
        const accessToken = await getAccessTokenSilently();
        // console.log('accessToken: ', accessToken);
        try {
            const response = await fetch(BACK_URI+'/api/v1/users/', {
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

    const getOneFacility = async (id) => {
        const accessToken = await getAccessTokenSilently();
        // console.log(accessToken)
        try {
            const response = await fetch(BACK_URI+'/api/v1/facility/' + id, {
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

    const getAllFacilities = async () => {
        const accessToken = await getAccessTokenSilently();
        // console.log('accessToken: ', accessToken);
        try {
            const response = await fetch(BACK_URI+'/api/v1/facility/', {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                }});
            if (response.ok) {
                const jsonResponse = await response.json();
                const {data} = jsonResponse;
                setAllFacilities([...data]);
            } else
                return false;
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => { getAllFacilities() }, [])

    return (
        <DataContext.Provider value={{allFacilities, setAllFacilities, getAllFacilities, getOneFacility, getAllUsers}}>
            <Routes>
                <Route path='/' element={<FacilityIndex />} />
                <Route path='new' element={<FacilityNew />} />
                <Route path='show/:id' element={<FacilityShow />} />
                <Route path='edit/:id' element={<FacilityEdit />} />
                <Route path='*' element={<NotFound />} />
            </Routes>
        </DataContext.Provider>
    )
}

export default FacilityRoutes;