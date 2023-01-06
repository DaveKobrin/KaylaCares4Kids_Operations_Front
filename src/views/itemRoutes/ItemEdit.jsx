import { useState, useContext, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { ConstContext, DataContext } from "../../App";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Form, FormGroup, Label, Input, Row, Col, Button, Table, InputGroup, DropdownItem } from 'reactstrap';
import { FormDropdown } from "../../components";


const ItemEdit = () => {
    const { id } = useParams();
    const { BACK_URI } = useContext(ConstContext);
    const { dropdownData, getOneItem, getAllItems, getLookupData, getFacilityData, getDestinationData } = useContext(DataContext);
    const { getAccessTokenSilently } = useAuth0();
    const navigate = useNavigate();
    const [ lookupData, setLookupData ] = useState([]);
    const [ facilityData, setFacilityData ] = useState([]);
    const [ destinationData, setDestinationData ] = useState([]);
    const [ newItem, setNewItem ] = useState({});

    useEffect(()=>{
        const loadone = async () => {
            const itm = await getOneItem(parseInt(id));
            if(itm) {
                itm.destination_id = itm.destination_id?.id;
                setNewItem({...itm});
            }
            const data = await getLookupData();
            if (data) setLookupData(data);
            const facData = await getFacilityData();
            if (facData) setFacilityData(facData);
            const destData = await getDestinationData();
            if (destData) setDestinationData(destData);
        }
        loadone();
    },[]);

    useEffect(()=>{
        const getData = async () => {
            const data = await getLookupData();
            if (data) setLookupData(data);
        };
        getData();
    },[]);

    const handleChange = (e) => {
        e.preventDefault();
        let tmpItem = {...newItem};
        tmpItem[e.target.name] = e.target.value;
        setNewItem(tmpItem);
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
        tmpItem.received_by = typeof tmpItem.received_by !== "string"? tmpItem.received_by.id: tmpItem.received_by;
        tmpItem.facility_id = typeof tmpItem.facility_id !== "string"? tmpItem.facility_id.id: tmpItem.facility_id;
        tmpItem.destination_id = (typeof tmpItem.destination_id !== "string" && tmpItem.destination_id !== null)? tmpItem.destination_id.id: tmpItem.destination_id;
        // console.log(tmpItem);
        try {
            const response = await fetch(BACK_URI + '/api/v1/inventory/' + id, {
                method: 'PUT',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
                body: JSON.stringify(tmpItem)
            });
            if(response.ok){
                getAllItems();
                navigate('/items')
            }
        } catch (error) {
            console.error(error);
        }
    }

    return(
        <Container>
            <Row>
                <Col sm={12} md={9} >
                    <Container>
                        <Form onSubmit={handleSubmit}>
                            <Row>
                                <Col xs={12} md={3}>
                                    <FormGroup floating>
                                        <Input type='text' name="upc_code" id="upc_code" onChange={(e)=>{handleChange(e)}} placeholder="UPC" value={newItem?.upc_code} />
                                        <Label htmlFor="upc_code">UPC</Label>
                                    </FormGroup>
                                </Col>
                                <Col xs={12} md={6}>
                                    <FormGroup floating>
                                        <Input type='text' name="title_desc" id="title_desc" onChange={(e)=>{handleChange(e)}} placeholder="Title / Description" value={newItem?.title_desc} />
                                        <Label htmlFor="title_desc">Title / Description</Label>
                                    </FormGroup>
                                </Col>
                                <Col xs={12} md={3}>
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
                                <Col xs={12} md={3}>
                                    <FormGroup floating>
                                        <Input type='select' name="facility_id" id="facility_id" onChange={(e)=>{handleChange(e)}} placeholder="Facility" value={newItem?.facility_id}>
                                            {facilityData?.map((facility)=>{
                                                return <option key={facility.id} value={facility.id}>{facility.name}</option>
                                            })}
                                        </Input>
                                        <Label htmlFor="facility_id">Facility</Label>
                                    </FormGroup>
                                </Col>
                                <Col xs={12} md={6}>
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
                                <Col xs={12} md={3}>
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
                                <Col xs={12} md={4}>
                                    <FormGroup floating>
                                        <Input type='text' name="artist" id="artist" onChange={(e)=>{handleChange(e)}} placeholder="Artist / Author" value={newItem?.artist} />
                                        <Label htmlFor="artist">Artist / Author</Label>
                                    </FormGroup>
                                </Col>
                                <Col xs={12} md={3}>
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
                                <Col xs={12} md={3}>
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
                                <Col xs={12} md={2}>
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
                                <Col xs={12} md={4}>
                                    <FormGroup floating>
                                        <Input type='text' name="fair_market_value" id="fair_market_value" onChange={(e)=>{handleChange(e)}} placeholder="Fair Market Value" value={newItem?.fair_market_value} />
                                        <Label htmlFor="fair_market_value">Fair Market Value</Label>
                                    </FormGroup>
                                </Col>
                                <Col xs={12} md={4}>
                                    <FormGroup floating>    
                                        <Input type='text' name="kids_served" id="kids_served" onChange={(e)=>{handleChange(e)}} placeholder="Kids Served" value={newItem?.kids_served} />
                                        <Label htmlFor="kids_served">Kids Served</Label>
                                    </FormGroup>
                                </Col>
                                <Col xs={12} md={4}>
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
                            </Row>
                            <Row>
                                <Col xs={12} md={4}>
                                    <FormGroup floating>
                                        <Input type='date' name="date_received" id="date_received" onChange={(e)=>{handleChange(e)}} placeholder="Date Received" defaultValue={newItem?.date_received} />
                                        <Label htmlFor="date_received">Date Received</Label>
                                    </FormGroup>
                                </Col>
                                <Col xs={12} md={4}>
                                    <FormGroup floating>
                                        <Input type='date' name="date_shipped" id="date_shipped" onChange={(e)=>{handleChange(e)}} placeholder="Date Shipped" defaultValue={newItem?.date_shipped} />
                                        <Label htmlFor="date_shipped">Date Shipped</Label>
                                    </FormGroup>
                                </Col>
                                <Col xs={12} md={4}>
                                    <FormGroup floating>
                                        <Input type='select' name="destination_id" id="destination_id" onChange={(e)=>{handleChange(e)}} placeholder="Destination" value={newItem?.destination_id}>
                                            <option value={'NULL'}>N/A</option>
                                            {destinationData?.map((destination)=>{
                                                return <option key={destination.id} value={destination.id}>{destination.name}</option>
                                            })}
                                        </Input>
                                        <Label htmlFor="destination_id">Destination</Label>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Button tag="input" type="submit" value="Update Item" color="primary" />

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

export default ItemEdit;



















