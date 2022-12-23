import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ConstContext, DataContext } from "../../App";
import { useAuth0 } from "@auth0/auth0-react";
import { Container, Form, FormGroup, Label, Input, InputGroup, Row, Col, Button, Table } from 'reactstrap';

const ItemNew = () => {
    const placeholderData = {
        upc_code: 'UPC',
        title_desc: 'Title / Description',
        format: 'Format',
        facility_id: 'Facility Id',
        category: 'Category',
        condition: 'Condition',
        artist: 'Artist / Author',
        genre: 'Genre',
        age_range: 'Age Range',
        rating: 'Rating',
        fair_market_value: 'Fair Market Value',
        kids_served: 'Kids Served',
        location: 'Location',
        quantity: 1,
    }

    const { BACK_URI } = useContext(ConstContext);
    const { getAllItems, getLookupData, getFacilityData, getDestinationData } = useContext(DataContext);
    const { getAccessTokenSilently } = useAuth0();
    const navigate = useNavigate();
    const [ newItem, setNewItem ] = useState({});
    const [ lookupData, setLookupData ] = useState([]);
    const [ upcData, setUpcData ] = useState({placeholderData});

    useEffect(()=>{
        const getData = async () => {
            const data = await getLookupData();
            if (data) setLookupData(data);
            const facData = await getFacilityData();
            console.log({facData});
            const destData = await getDestinationData();
            console.log({destData});
        };
        getData();
    },[]);

    const handleChange = (e) => {
        e.preventDefault();
        let tmpItem = {...newItem};
        tmpItem[e.target.name] = e.target.value;
        setNewItem(tmpItem);
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
    
    const handleLookup = async () => {
        if(newItem['upc_code']) {
            const applyData = (data) => {
                const tmpData = {...upcData};
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
                setUpcData(tmpData);
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
                                <Col sm={3}>
                                    <InputGroup cssModule={{'input-group': 'input-group-floating'}} floating>
                                        <Input type='text' name="upc_code" id="upc_code" onChange={(e)=>{handleChange(e)}} value={upcData?.upc_code} />
                                        <Label htmlFor="upc_code">UPC</Label>
                                        <Button color="primary" onClick={handleLookup}>+</Button>
                                    </InputGroup>
                                </Col>
                                <Col sm={6}>
                                    <FormGroup floating>
                                        <Input type='text' name="title_desc" id="title_desc" onChange={(e)=>{handleChange(e)}} value={upcData?.title_desc} />
                                        <Label htmlFor="title_desc">Title / Description</Label>
                                    </FormGroup>
                                </Col>
                                <Col sm={3}>
                                    <FormGroup floating>
                                        <Input type='text' name="format" id="format" onChange={(e)=>{handleChange(e)}} value={upcData?.format} />
                                        <Label htmlFor="format">Format</Label>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col sm={3}>
                                    <FormGroup floating>
                                        <Input type='text' name="facility_id" id="facility_id" onChange={(e)=>{handleChange(e)}} value={upcData?.facility_id} />
                                        <Label htmlFor="facility_id">Facility</Label>
                                    </FormGroup>
                                </Col>
                                <Col md={6}>
                                    <FormGroup floating>
                                        <Input type='text' name="category" id="category" onChange={(e)=>{handleChange(e)}} value={upcData?.category} />
                                        <Label htmlFor="category">Category</Label>
                                    </FormGroup>
                                </Col>
                                <Col md={3}>
                                    <FormGroup floating>
                                        <Input type='select' name="condition" id="condition" onChange={(e)=>{handleChange(e)}} value={upcData?.condition}>
                                            <option>Gently Used</option>
                                            <option>New</option>
                                        </Input>
                                        <Label htmlFor="condition">Condition</Label>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col sm={4}>
                                    <FormGroup floating>
                                        <Input type='text' name="artist" id="artist" onChange={(e)=>{handleChange(e)}} value={upcData?.artist} />
                                        <Label htmlFor="artist">Artist / Author</Label>
                                    </FormGroup>
                                </Col>
                                <Col md={3}>
                                    <FormGroup floating>
                                        <Input type='text' name="genre" id="genre" onChange={(e)=>{handleChange(e)}} value={upcData?.genre} />
                                        <Label htmlFor="genre">Genre</Label>
                                    </FormGroup>
                                </Col>
                                <Col md={3}>
                                    <FormGroup floating>
                                        <Input type='text' name="age_range" id="age_range" onChange={(e)=>{handleChange(e)}} value={upcData?.age_range} />
                                        <Label htmlFor="age_range">Age Range</Label>
                                    </FormGroup>
                                </Col>
                                <Col md={2}>
                                    <FormGroup floating>
                                        <Input type='text' name="rating" id="rating" onChange={(e)=>{handleChange(e)}} value={upcData?.rating} />
                                        <Label htmlFor="rating">Rating</Label>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col sm={3}>
                                    <FormGroup floating>
                                        <Input type='text' name="fair_market_value" id="fair_market_value" onChange={(e)=>{handleChange(e)}} value={upcData?.fair_market_value} />
                                        <Label htmlFor="fair_market_value">Fair Market Value</Label>
                                    </FormGroup>
                                </Col>
                                <Col md={3}>
                                    <FormGroup floating>    
                                        <Input type='text' name="kids_served" id="kids_served" onChange={(e)=>{handleChange(e)}} value={upcData?.kids_served} />
                                        <Label htmlFor="kids_served">Kids Served</Label>
                                    </FormGroup>
                                </Col>
                                <Col md={3}>
                                    <FormGroup floating>
                                        <Input type='text' name="location" id="location" onChange={(e)=>{handleChange(e)}} value={upcData?.location} />
                                        <Label htmlFor="location">Location</Label>
                                    </FormGroup>
                                </Col>
                                <Col md={3}>
                                    <FormGroup floating>
                                        <Input type='text' name="quantity" id="quantity" defaultValue='1' onChange={(e)=>{handleChange(e)}} value={upcData?.quantity} />
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

