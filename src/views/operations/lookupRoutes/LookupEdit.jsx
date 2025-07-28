import { useState, useContext, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { ConstContext, DataContext } from "../../../App";
import { useParams, useNavigate } from "react-router";
import { Container, Form, FormGroup, Label, Input, Row, Button } from 'reactstrap';


const LookupEdit = () => {
    const { id } = useParams();
    const { BACK_URI, PATH_STRINGS } = useContext(ConstContext);
    const { getOneLookupItem, getAllLookupItems } = useContext(DataContext);
    const { getAccessTokenSilently } = useAuth0();
    const navigate = useNavigate();
    const [ newItem, setNewItem ] = useState({});

    useEffect(()=>{
        const loadone = async () => {
            const itm = await getOneLookupItem(parseInt(id));
            if(itm) setNewItem({...itm});
            // console.log(itm)
        }
        loadone();
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
        try {
            const response = await fetch(BACK_URI + '/api/v1/lookup/' + id, {
                method: 'PUT',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
                body: JSON.stringify(tmpItem)
            });
            if(response.ok){
                getAllLookupItems();
                navigate(PATH_STRINGS.ops_lookups)
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
                        <Input type='text' name="description" id="description" onChange={(e)=>{handleChange(e)}} placeholder="Description" defaultValue={newItem?.description} />
                        <Label htmlFor="description">Description</Label>
                    </FormGroup>
                </Row>
                <Row>
                    <FormGroup floating>
                        <Input type='text' name="value" id="value" onChange={(e)=>{handleChange(e)}} placeholder="Fair Market Value" defaultValue={newItem?.value} />
                        <Label htmlFor="value">Fair Market Value</Label>
                    </FormGroup>
                </Row>
                <Row>
                    <FormGroup floating>
                        <Input type='text' name="kids_served" id="kids_served" onChange={(e)=>{handleChange(e)}} placeholder="Kids Served" defaultValue={newItem?.kids_served} />
                        <Label htmlFor="kids_served">Kids Served</Label>
                    </FormGroup>
                </Row>                         
                <Button tag="input" type="submit" value="Update Item" color="primary" />
            </Form>      
        </Container>
    )
}

export default LookupEdit;



















