import { Routes, Route } from "react-router-dom";
import { ItemIndex, ItemNew, ItemShow, ItemEdit, NotFound } from '..';
import { DataContext, UserContext, ConstContext } from '../../App';
import { useState, useContext, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import './item_styles.css';

const ItemRoutes = () => {
    const { getAccessTokenSilently } = useAuth0();
    // const { currUser } = useContext(UserContext);
    const { BACK_URI } = useContext(ConstContext); 
    const [allItems, setAllItems] = useState([]);

    const getOneItem = async (id) => {
        const accessToken = await getAccessTokenSilently();
        try {
            const response = await fetch(BACK_URI+'/api/v1/inventory/' + id, {
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

    const getAllItems = async () => {
        const accessToken = await getAccessTokenSilently();
        try {
            const response = await fetch(BACK_URI+'/api/v1/inventory/', {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                }});
            if (response.ok) {
                const jsonResponse = await response.json();
                const {data} = jsonResponse;
                setAllItems([...data]);
            }
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => { getAllItems() }, [])

    return (
        <DataContext.Provider value={{allItems, setAllItems, getAllItems, getOneItem}}>
            <Routes>
                <Route path='/' element={<ItemIndex />} />
                <Route path='new' element={<ItemNew />} />
                <Route path='show/:id' element={<ItemShow />} />
                <Route path='edit/:id' element={<ItemEdit />} />
                <Route path='*' element={<NotFound />} />
            </Routes>
        </DataContext.Provider>
    )
}

export default ItemRoutes;