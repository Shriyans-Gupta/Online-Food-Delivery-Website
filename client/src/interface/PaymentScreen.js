import React,{useState} from 'react';
import { useNavigate , useLocation} from 'react-router-dom';
import {Form , Button , Col} from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import { useDispatch, useSelector } from 'react-redux';
import { savePaymentMethod } from '../actions/cartActions'; 
import CheckoutSteps from '../components/CheckoutSteps';

const PaymentScreen = () => {
     
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const cart = useSelector(state => state.cart);
    const {shippingAddress} = cart;

    if(!shippingAddress){
        navigate('/shipping');
    }

    const [paymentMethod, setPaymentMethod] = useState(''); 
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(savePaymentMethod(paymentMethod));
        navigate('/placeorder');
    }

    return (
        <FormContainer>
           <CheckoutSteps step1 step2 step3/>
            <h3>CHOOSE YOUR PAYMENT OPTION</h3>
            <br/>
             <Form onSubmit={submitHandler}>
                  <Form.Group>
                      <Form.Label as='Legend'>Select Method</Form.Label>
                  <Col>
                      <Form.Check
                      type='radio'
                      label= 'Debit Card or Credit Card'
                      id='Online Payment'
                      name = 'paymentMethod'
                      value='Online Payment'
                      onChange = {(e) => setPaymentMethod(e.target.value)}>

                      </Form.Check>
                  </Col>
                  <br/>
                  <Col>
                      <Form.Check
                      type='radio'
                      label= 'Cash On Delivery'
                      id='Cash On Delivery'
                      name = 'paymentMethod'
                      value='Cash On Delivery'
                      onChange = {(e) => setPaymentMethod(e.target.value)}>

                      </Form.Check>
                  </Col>
                  </Form.Group>
              <Button type='submit' variant='dark'>
                   Continue
              </Button>
            </Form>
        </FormContainer>

    )
}

export default PaymentScreen;