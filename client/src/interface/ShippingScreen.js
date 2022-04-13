import React,{useState} from 'react';
import { useNavigate , useLocation} from 'react-router-dom';
import {Form , Button} from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import { useDispatch, useSelector } from 'react-redux';
import { saveShippingAddress } from '../actions/cartActions'; 
import CheckoutSteps from '../components/CheckoutSteps';

const ShippingScreen = () => {

    const cart = useSelector(state => state.cart);
    const {shippingAddress} = cart;

    const [address, setAddress] = useState(''||shippingAddress.address);
    const [city , setCity] = useState(''||shippingAddress.city);
    const [postalCode , setPostalCode] = useState(''||shippingAddress.postalCode);
    const country = 'India';
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(saveShippingAddress({address , city , postalCode , country}));
        navigate('/payment');
    }

    return (
        <FormContainer>
           <CheckoutSteps step1 step2 />
            <h1>DELIVERY &nbsp; ADDRESS</h1>
            <Form onSubmit = {submitHandler}>
              <Form.Group controlId='address'>
                <Form.Label>Address</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter Address'
                  value={address}
                  onChange={(e)=> setAddress(e.target.value)}>
                  </Form.Control>
              </Form.Group>
              <Form.Group controlId='city'>
                <Form.Label>City/Town</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter City'
                  value={city}
                  onChange={(e)=> setCity(e.target.value)}>
                  </Form.Control>
              </Form.Group>
              <Form.Group controlId='postalCode'>
                <Form.Label>Postal Code</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter PostalCode'
                  value={postalCode}
                  onChange={(e)=> setPostalCode(e.target.value)}>
                  </Form.Control>   
              </Form.Group>
              <Button type='submit' variant='dark'>
                   Continue
              </Button>
            </Form>
        </FormContainer>

    )
}

export default ShippingScreen;