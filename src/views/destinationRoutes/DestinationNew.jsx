import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ConstContext, DataContext } from "../../App";
import { useAuth0 } from "@auth0/auth0-react";
import { Container, Form, FormGroup, Label, Input, Row, Col, Button, Table } from 'reactstrap';
import { countries, states } from "../../constants";

const DestinationNew = () => {
    const { BACK_URI } = useContext(ConstContext);
    const { getAllDestinations } = useContext(DataContext);
    const { getAccessTokenSilently } = useAuth0();
    const navigate = useNavigate();
    const [ newDestination, setNewDestination ] = useState({});
    // const [ users, setUsers ] = useState([]);
    
    // useEffect(() => { 
    //     const getData = async () => {
    //         const tmpUsers = await getAllUsers();
    //         // console.log({tmpUsers});
    //         if(tmpUsers) setUsers(tmpUsers); 
    //     }
    //     getData();
    // }, []);

    const handleChange = (e) => {
        e.preventDefault();
        let tmpDestination = {...newDestination};
        tmpDestination[e.target.name] = e.target.value;
        setNewDestination(tmpDestination);
    }

    const handleSubmit = async (e) => {
        const accessToken = await getAccessTokenSilently();
        e.preventDefault();
        let tmpDestination = {...newDestination};
        try {
            const response = await fetch(BACK_URI + '/api/v1/destination/', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
                body: JSON.stringify(tmpDestination)
            });
            if(response.ok){
                getAllDestinations();
                navigate('/destination')
            }
        } catch (error) {
            console.error(error);
        }
    }
    
    return(
        <Container>
            <Form onSubmit={handleSubmit}>
                <Row>
                    <FormGroup floating>
                        <Input type='text' name="name" id="name" onChange={(e)=>{handleChange(e)}} placeholder="Name" />
                        <Label htmlFor="name">Name</Label>
                    </FormGroup>
                </Row>
                <Row>
                    <FormGroup floating>
                        <Input type='text' name="address1" id="address1" onChange={(e)=>{handleChange(e)}} placeholder="Address 1" />
                        <Label htmlFor="address1">Address 1</Label>
                    </FormGroup>
                </Row>
                <Row>
                    <FormGroup floating>
                        <Input type='text' name="address2" id="address2" onChange={(e)=>{handleChange(e)}} placeholder="Address 2" />
                        <Label htmlFor="address2">Address 2</Label>
                    </FormGroup>
                </Row>
                <Row>
                    <Col md={5}>
                        <FormGroup floating>
                            <Input type='text' name="city" id="city" onChange={(e)=>{handleChange(e)}} placeholder="City" />
                            <Label htmlFor="city">City</Label>
                        </FormGroup>
                    </Col>
                    <Col sm={2}>
                        <FormGroup floating>
                            <Input type='select' name="state" id="state" onChange={(e)=>{handleChange(e)}} placeholder="State" >
                                {states.map((state)=>{
                                    return <option key={state.abbr} value={state.abbr}>{`${state.name} (${state.abbr})`}</option>
                                })}
                            </Input>
                            <Label htmlFor="state">State</Label>
                        </FormGroup>
                    </Col>
                    <Col md={3}>
                        <FormGroup floating>
                            <Input type='text' name="zipcode" id="zipcode" onChange={(e)=>{handleChange(e)}} placeholder="Zipcode" />
                            <Label htmlFor="zipcode">Zipcode</Label>
                        </FormGroup>
                    </Col>
                    <Col sm={2}>
                        <FormGroup floating>
                            <Input type='select' name="country" id="country" onChange={(e)=>{handleChange(e)}} placeholder="Country" >
                                {countries.map((country)=>{
                                    return <option key={country.code3} value={country.code3}>{`${country.name} (${country.code3})`}</option>
                                })}
                            </Input>
                            <Label htmlFor="country">Country</Label>
                        </FormGroup>
                    </Col>
                </Row> 
                <Row>
                    <Col md={4}>
                        <FormGroup floating>
                            <Input type='text' name="contact_name" id="contact_name" onChange={(e)=>{handleChange(e)}} placeholder="Contact Name" />
                            <Label htmlFor="contact_name">Contact Person</Label>
                        </FormGroup>
                    </Col>
                    <Col md={5}>
                        <FormGroup floating>
                            <Input type='text' name="contact_email" id="contact_email" onChange={(e)=>{handleChange(e)}} placeholder="Contact E-mail" />
                            <Label htmlFor="contact_email">Contact E-mail</Label>
                        </FormGroup>
                    </Col>
                    <Col md={3}>
                        <FormGroup floating>
                            <Input type='text' name="contact_phone" id="contact_phone" onChange={(e)=>{handleChange(e)}} placeholder="Contact Phone" />
                            <Label htmlFor="contact_phone">Contact Phone</Label>
                        </FormGroup>
                    </Col>
                </Row>
                <Button tag="input" type="submit" value="Add Destination" color="primary" />
            </Form>
        </Container>
    )
}

export default DestinationNew;

