import { Routes, Route } from "react-router-dom";
import { ItemIndex, ItemNew, ItemShow, ItemEdit, NotFound } from '../..';
import { DataContext, UserContext, ConstContext } from '../../../App';
import { useState, useContext, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import './item_styles.css';

const ItemRoutes = () => {
    const { getAccessTokenSilently } = useAuth0();
    const defaultDropdownData = {
        format: [],
        category: [],
        genre: [],
        age_range: [],
        rating: [],
        location: []
    };
    const { BACK_URI } = useContext(ConstContext); 
    const [ allItems, setAllItems ] = useState([]);
    const [ dropdownData, setDropdownData ] = useState(defaultDropdownData);

    const parseDate = (date) => {
        if(!date) return false;
        let newDate = (new Date(Date.parse(date))).toISOString();
        newDate = newDate.split('T');
        newDate = newDate[0];
        return newDate;
    }

    const parseDropdownData = (data) => {
        const formats = new Set();
        const categories = new Set();
        const genres = new Set();
        const age_ranges = new Set();
        const ratings = new Set();
        const locations = new Set();

        for (const item of data) {
            formats.add(item.format);
            categories.add(item.category);
            genres.add(item.genre);
            age_ranges.add(item.age_range);
            ratings.add(item.rating);
            locations.add(item.location);
        }

        setDropdownData({
            format: [...formats],
            category: [...categories],
            genre: [...genres],
            age_range: [...age_ranges],
            rating: [...ratings],
            location: [...locations]
        });
    }

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
                if(data.date_received) data.date_received = parseDate(data.date_received);
                if(data.date_shipped) data.date_shipped = parseDate(data.date_shipped);
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
                parseDropdownData([...data]);
            }
        } catch (error) {
            console.error(error);
        }
    }

    const getLookupData = async () => {
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
                return data;
            } else
                return false;
        } catch (error) {
            console.error(error);
        }
    }

    const getFacilityData = async () => {
        const accessToken = await getAccessTokenSilently();
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
                return data;
            } else
                return false;
        } catch (error) {
            console.error(error);
        }
    }

    const getDestinationData = async () => {
        const accessToken = await getAccessTokenSilently();
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
                return data;
            } else
                return false;
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => { getAllItems() }, [])

    return (
        <DataContext.Provider value={{allItems, dropdownData, setAllItems, getAllItems, getOneItem, getLookupData, getFacilityData, getDestinationData}}>
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