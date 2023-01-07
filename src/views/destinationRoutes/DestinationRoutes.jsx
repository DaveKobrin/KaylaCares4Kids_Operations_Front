import { Routes, Route } from "react-router-dom";
import { DestinationIndex, DestinationNew, DestinationShow, DestinationEdit, NotFound } from '..';
import { DataContext, UserContext, ConstContext } from '../../App';
import { useState, useContext, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import './destination_styles.css';

const DestinationRoutes = () => {
    const { getAccessTokenSilently } = useAuth0();
    // const { currUser } = useContext(UserContext);
    const { BACK_URI } = useContext(ConstContext); 
    const [allDestinations, setAllDestinations] = useState([]);

    // const getAllUsers = async () => {
    //     const accessToken = await getAccessTokenSilently();
    //     // console.log('accessToken: ', accessToken);
    //     try {
    //         const response = await fetch(BACK_URI+'/api/v1/users/', {
    //             method: 'GET',
    //             credentials: 'include',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 Authorization: `Bearer ${accessToken}`,
    //             }});
    //         if (response.ok) {
    //             const jsonResponse = await response.json();
    //             const {data} = jsonResponse;
    //             return data;
    //         } else
    //             return false;
    //     } catch (error) {
    //         console.error(error);
    //     }
    // }

    const getOneDestination = async (id) => {
        const accessToken = await getAccessTokenSilently();
        // console.log(accessToken)
        try {
            const response = await fetch(BACK_URI+'/api/v1/destination/' + id, {
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

    const getAllDestinations = async () => {
        const accessToken = await getAccessTokenSilently();
        // console.log('accessToken: ', accessToken);
        try {
            const response = await fetch(BACK_URI+'/api/v1/destination/', {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                }});
            if (response.ok) {
                const jsonResponse = await response.json();
                const {data} = jsonResponse;
                setAllDestinations([...data]);
            } else
                return false;
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => { getAllDestinations() }, [])

    return (
        <DataContext.Provider value={{allDestinations, setAllDestinations, getAllDestinations, getOneDestination }}>
            <Routes>
                <Route path='/' element={<DestinationIndex />} />
                <Route path='new' element={<DestinationNew />} />
                <Route path='show/:id' element={<DestinationShow />} />
                <Route path='edit/:id' element={<DestinationEdit />} />
                <Route path='*' element={<NotFound />} />
            </Routes>
        </DataContext.Provider>
    )
}

export default DestinationRoutes;