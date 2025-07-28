import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { ConstContext, DataContext } from "../../../App";
import { useAuth0 } from "@auth0/auth0-react";
import { Container, Form, FormGroup, Label, Input, InputGroup, Row, Col, Button, Table, DropdownItem } from 'reactstrap';
import { FormDropdown } from '../../../components';

const ItemNew = () => {
    const placeholderData = {
        upc_code: '',
        title_desc: '',
        format: '',
        facility_id: '',
        category: '',
        condition: '',
        artist: '',
        genre: '',
        age_range: '',
        rating: '',
        fair_market_value: '',
        kids_served: '',
        location: '',
        quantity: 1,
    }

    const { BACK_URI, PATH_STRINGS } = useContext(ConstContext);
    const { dropdownData, getAllItems, getLookupData, getFacilityData } = useContext(DataContext);
    const { getAccessTokenSilently } = useAuth0();
    const navigate = useNavigate();
    const [ newItem, setNewItem ] = useState({placeholderData});
    const [ lookupData, setLookupData ] = useState([]);
    const [ facilityData, setFacilityData ] = useState([]);


    useEffect(()=>{
        const getData = async () => {
            const data = await getLookupData();
            if (data) setLookupData(data);
            const facData = await getFacilityData();
            if (facData) setFacilityData(facData);
        };
        getData();
    },[]);

    const handleChange = (e) => {
        e.preventDefault();
        let tmpItem = {...newItem};
        tmpItem[e.target.name] = e.target.value;
        setNewItem(tmpItem);
        // console.log({tmpItem})
    }

    const handleComboClick = (target, value) => {
        let tmpItem = {...newItem};
        tmpItem[target] = value;
        setNewItem(tmpItem);
        // console.log({tmpItem})
    }

    const handleSubmit = async (e) => {
        const accessToken = await getAccessTokenSilently();
        e.preventDefault();
        let tmpItem = {...newItem};
        const payload = [];
        // console.log({tmpItem})
        tmpItem.facility_id = parseInt(tmpItem.facility_id) || 1;
        const quant = parseInt(tmpItem.quantity) || 1;
        delete tmpItem.quantity;
        for (let index = 0; index < quant; index++) {
            payload.push(tmpItem);
        }
        // console.log({payload})
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
                navigate(PATH_STRINGS.ops_items)
            }
        } catch (error) {
            console.error(error);
        }
    }
    
    const handleLookup = async () => {
        if(newItem['upc_code']) {
            const applyData = (data) => {
                const tmpData = {...newItem};
                tmpData.upc_code = data?.upc ? data.upc : tmpData.upc_code;
                tmpData.title_desc = data?.title ? data.title : tmpData.title_desc;
                tmpData.category = data?.category ? data.category : tmpData.category;
                tmpData.artist = data?.publisher ? data.publisher : tmpData.artist;
                if (data?.offers?.length > 0) {
                    let minNew = Infinity;
                    let minUsed = Infinity;
                    for (const offer of data.offers) {
                        if(offer.condition.toLowerCase() === 'new' && offer.price < minNew ) {
                            minNew = offer.price;
                        }
                        if(offer.condition.toLowerCase() === 'used' && offer.price < minUsed) {
                            minUsed = offer.price;
                        }
                    }
                    if(minNew === Infinity) minNew = 'unknown';
                    if(minUsed === Infinity) minUsed = 'unknown';
                    const fmvString = `retail new: ${minNew} used: ${minUsed}`;
                    tmpData.fair_market_value = fmvString;
                }
                setNewItem(tmpData);
            }
            const accessToken = await getAccessTokenSilently();
            const payload = newItem['upc_code'];    
            // console.log({payload});
            try {
                const response = await fetch(BACK_URI + '/api/v1/inventory/upc/' + payload, {
                    method: 'GET',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${accessToken}`,
                    },
                });
                if(response.ok) {
                    const jsonResponse = await response.json();
                    const {data} = jsonResponse;
                    applyData(data.items[0]);
                    // console.log({upcData});
                }
            } catch (error) {
                console.error(error);
            }
        }
    }

    return(
        <Container>
            <Row>
                <Col sm={12} md={9} >
                    <Container>
                        <Form onSubmit={handleSubmit}>
                            <Row>
                                <Col md={3}>
                                    <InputGroup cssModule={{'input-group': 'input-group-floating'}} floating>
                                        <Input type='text' name="upc_code" id="upc_code" onChange={(e)=>{handleChange(e)}} placeholder="UPC" value={newItem?.upc_code} />
                                        <Label htmlFor="upc_code">UPC</Label>
                                        <Button color="primary" onClick={handleLookup}>+</Button>
                                    </InputGroup>
                                </Col>
                                <Col md={6}>
                                    <FormGroup floating>
                                        <Input type='text' name="title_desc" id="title_desc" onChange={(e)=>{handleChange(e)}} placeholder="Title / Description" value={newItem?.title_desc} />
                                        <Label htmlFor="title_desc">Title / Description</Label>
                                    </FormGroup>
                                </Col>
                                <Col md={3}>
                                    <InputGroup cssModule={{'input-group': 'input-group-floating'}} floating>
                                        <Input type='text' name="format" id="format" onChange={(e)=>{handleChange(e)}} placeholder="Format" value={newItem?.format} />
                                        <Label htmlFor="format">Format</Label>
                                        <FormDropdown dark={false} end={true} flip={true} direction={'down'}>
                                            {dropdownData?.format.map((value, idx)=>{
                                                return <DropdownItem key={idx} onClick={()=>{handleComboClick('format', value)}}>{value}</DropdownItem>
                                            })}
                                        </FormDropdown>
                                    </InputGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={3}>
                                    <FormGroup floating>
                                        <Input type='select' name="facility_id" id="facility_id" onChange={(e)=>{handleChange(e)}} placeholder="Facility" value={newItem?.facility_id}>
                                            {facilityData?.map((facility)=>{
                                                return <option key={facility.id} value={facility.id}>{facility.name}</option>
                                            })}
                                        </Input>
                                        <Label htmlFor="facility_id">Facility</Label>
                                    </FormGroup>
                                </Col>
                                <Col md={6}>
                                    <InputGroup cssModule={{'input-group': 'input-group-floating'}} floating>
                                        <Input type='text' name="category" id="category" onChange={(e)=>{handleChange(e)}} placeholder="Category" value={newItem?.category} />
                                        <Label htmlFor="category">Category</Label>
                                        <FormDropdown dark={false} end={true} flip={true} direction={'down'}>
                                            {dropdownData?.category.map((value, idx)=>{
                                                return <DropdownItem key={idx} onClick={()=>{handleComboClick('category', value)}}>{value}</DropdownItem>
                                            })}
                                        </FormDropdown>
                                    </InputGroup>
                                </Col>
                                <Col md={3}>
                                    <FormGroup floating>
                                        <Input type='select' name="condition" id="condition" onChange={(e)=>{handleChange(e)}} placeholder="Condition" value={newItem?.condition}>
                                            <option>Gently Used</option>
                                            <option>New</option>
                                        </Input>
                                        <Label htmlFor="condition">Condition</Label>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={4}>
                                    <FormGroup floating>
                                        <Input type='text' name="artist" id="artist" onChange={(e)=>{handleChange(e)}} placeholder="Artist / Author" value={newItem?.artist} />
                                        <Label htmlFor="artist">Artist / Author</Label>
                                    </FormGroup>
                                </Col>
                                <Col md={3}>
                                    <InputGroup cssModule={{'input-group': 'input-group-floating'}} floating>
                                        <Input type='text' name="genre" id="genre" onChange={(e)=>{handleChange(e)}} placeholder="Genre" value={newItem?.genre} />
                                        <Label htmlFor="genre">Genre</Label>
                                        <FormDropdown dark={false} end={true} flip={true} direction={'down'}>
                                            {dropdownData?.genre.map((value, idx)=>{
                                                return <DropdownItem key={idx} onClick={()=>{handleComboClick('genre', value)}}>{value}</DropdownItem>
                                            })}
                                        </FormDropdown>
                                    </InputGroup>
                                </Col>
                                <Col md={3}>
                                    <InputGroup cssModule={{'input-group': 'input-group-floating'}} floating>
                                        <Input type='text' name="age_range" id="age_range" onChange={(e)=>{handleChange(e)}} placeholder="Age Range" value={newItem?.age_range} />
                                        <Label htmlFor="age_range">Age Range</Label>
                                        <FormDropdown dark={false} end={true} flip={true} direction={'down'}>
                                            {dropdownData?.age_range.map((value, idx)=>{
                                                return <DropdownItem key={idx} onClick={()=>{handleComboClick('age_range', value)}}>{value}</DropdownItem>
                                            })}
                                        </FormDropdown>
                                    </InputGroup>
                                </Col>
                                <Col md={2}>
                                    <InputGroup cssModule={{'input-group': 'input-group-floating'}} floating>
                                        <Input type='text' name="rating" id="rating" onChange={(e)=>{handleChange(e)}} placeholder="Rating" value={newItem?.rating} />
                                        <Label htmlFor="rating">Rating</Label>
                                        <FormDropdown dark={false} end={true} flip={true} direction={'down'}>
                                            {dropdownData?.rating.map((value, idx)=>{
                                                return <DropdownItem key={idx} onClick={()=>{handleComboClick('rating', value)}}>{value}</DropdownItem>
                                            })}
                                        </FormDropdown>
                                    </InputGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={3}>
                                    <FormGroup floating>
                                        <Input type='text' name="fair_market_value" id="fair_market_value" onChange={(e)=>{handleChange(e)}} placeholder="Fair Market Value" value={newItem?.fair_market_value} />
                                        <Label htmlFor="fair_market_value">Fair Market Value</Label>
                                    </FormGroup>
                                </Col>
                                <Col md={3}>
                                    <FormGroup floating>    
                                        <Input type='text' name="kids_served" id="kids_served" onChange={(e)=>{handleChange(e)}} placeholder="Kids Served" value={newItem?.kids_served} />
                                        <Label htmlFor="kids_served">Kids Served</Label>
                                    </FormGroup>
                                </Col>
                                <Col md={3}>
                                    <InputGroup cssModule={{'input-group': 'input-group-floating'}} floating>
                                        <Input type='text' name="location" id="location" onChange={(e)=>{handleChange(e)}} placeholder="Location" value={newItem?.location} />
                                        <Label htmlFor="location">Location</Label>
                                        <FormDropdown dark={false} end={true} flip={true} direction={'down'}>
                                            {dropdownData?.location.map((value, idx)=>{
                                                return <DropdownItem key={idx} onClick={()=>{handleComboClick('location', value)}}>{value}</DropdownItem>
                                            })}
                                        </FormDropdown>
                                    </InputGroup>
                                </Col>
                                <Col md={3}>
                                    <FormGroup floating>
                                        <Input type='text' name="quantity" id="quantity" defaultValue='1' onChange={(e)=>{handleChange(e)}} value={newItem?.quantity} />
                                        <Label htmlFor="quantity">Quantity</Label>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Button tag="input" type="submit" value="Add Item(s)" color="primary" size="lg" />

                        </Form>
                    </Container>
                </Col>
                <Col sm={12} md={3} >
                    <Table striped size="sm">
                        <thead>
                            <tr>
                                <th>Description</th>
                                <th>Market Value</th>
                                <th>Kids Served</th>
                            </tr>
                        </thead>
                        <tbody>
                            {lookupData && lookupData.map((dataRow, idx)=>{
                                return (
                                    <tr key={idx}>
                                        <td>{dataRow.description}</td>
                                        <td>{dataRow.value}</td>
                                        <td>{dataRow.kids_served}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Container>
    )
}

export default ItemNew;

