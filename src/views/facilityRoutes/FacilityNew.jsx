import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ConstContext, DataContext } from "../../App";
import { useAuth0 } from "@auth0/auth0-react";
import { Container, Form, FormGroup, Label, Input, Row, Col, Button, Table } from 'reactstrap';
import { countries, states } from "../../constants";

const FacilityNew = () => {
    const { BACK_URI } = useContext(ConstContext);
    const { getAllFacilities, getAllUsers } = useContext(DataContext);
    const { getAccessTokenSilently } = useAuth0();
    const navigate = useNavigate();
    const [ newFacility, setNewFacility ] = useState({});
    const [ users, setUsers ] = useState([]);
    
    useEffect(() => { 
        const getData = async () => {
            const tmpUsers = await getAllUsers();
            // console.log({tmpUsers});
            if(tmpUsers) setUsers(tmpUsers); 
        }
        getData();
    }, []);

    const handleChange = (e) => {
        e.preventDefault();
        let tmpFacility = {...newFacility};
        tmpFacility[e.target.name] = e.target.value;
        setNewFacility(tmpFacility);
    }

    const handleSubmit = async (e) => {
        const accessToken = await getAccessTokenSilently();
        e.preventDefault();
        let tmpFacility = {...newFacility};
        try {
            const response = await fetch(BACK_URI + '/api/v1/facility/', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
                body: JSON.stringify(tmpFacility)
            });
            if(response.ok){
                getAllFacilities();
                navigate('/facility')
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
                    <Col xs={2}>
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
                    <Col xs={2}>
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
                    <FormGroup floating>
                        <Input type='select' name="contact_id" id="contact_id" onChange={(e)=>{handleChange(e)}} placeholder="Contact Person" >
                            {users?.map((user)=>{
                                return <option key={user.id} value={user.id}>{`${user.name} (${user.email})`}</option>
                            })}
                        </Input>
                        <Label htmlFor="contact_id">Contact Person</Label>
                    </FormGroup>
                </Row>
                <Button tag="input" type="submit" value="Add Facility" color="primary" />
            </Form>
        </Container>
    )
}

export default FacilityNew;

