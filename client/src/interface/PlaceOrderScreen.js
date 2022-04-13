import React,{useState , useEffect} from 'react';
import { useNavigate , useLocation , Link}  from 'react-router-dom';
import {Button , Row , Col , Image , ListGroup , Container , Card}  from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import { createOrder } from '../actions/orderActions';
import CheckoutSteps from '../components/CheckoutSteps';

const PlaceOrderScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cart = useSelector(state => state.cart);

  const {shippingAddress,paymentMethod,cartItems} = cart;
  const itemsPrice = cartItems.reduce(
      (acc,item)=>acc + item.price * item.qty, 0
  );

  const deliveryPrice = itemsPrice > 200 ? 0 : 50 ;
  const gstPrice = itemsPrice * 0.05 ;
  const totalPrice = itemsPrice + deliveryPrice + gstPrice;

  const orderCreate = useSelector(state => state.orderCreate);
  const {order, success , error} = orderCreate;

  useEffect(() => {
     if(success){
        navigate(`/order/${order._id}`);
     }
  },[success, order, navigate])

  const placeOrderHandler = () => {
      dispatch(createOrder({
          orderItems : cartItems,
          shippingAddress : shippingAddress,
          paymentMethod : paymentMethod,
          itemsPrice : itemsPrice,
          deliveryPrice : deliveryPrice,
          gstPrice : gstPrice,
          totalPrice : totalPrice
      }));
  };

  const link = {color: 'black', textDecoration: 'none'} ;
  return (
    <Container style={{marginBottom:'50px'}}>
        <CheckoutSteps step1 step2 step3 step4/>
        <Row>
           <Col md={8}>
               <ListGroup variant='flush'>
                  <ListGroup.Item>
                      <h4>DELIVERY PLACE</h4>
                      <p>
                          <strong>Address:</strong> &nbsp;  
                          {shippingAddress.address},{shippingAddress.city},
                          {shippingAddress.postalCode},{shippingAddress.country}
                      </p>
                  </ListGroup.Item>
                  <ListGroup.Item>
                      <h4>PAYMENT METHOD</h4>
                      <p>
                          <strong>Method: </strong> 
                          {paymentMethod}
                      </p>
                  </ListGroup.Item>
                  <ListGroup.Item>
                      <h4>ORDERED ITEMS</h4>
                      {
                          cartItems.length === 0 ? (
                             <Message>Your Cart is Empty </Message>
                          ) : (
                              <ListGroup variant='flush' style={{border : '1px solid black'}}>
                                  {
                                      cartItems.map((item , index)=>(
                                          <ListGroup.Item key={index}>
                                              <Row>
                                                  <Col md={1}>
                                                      <Image src={item.image} alt={item.name} fluid rounded/>
                                                  </Col>
                                                  <Col>
                                                      <Link to={`/foods/${item.product_id}`} style={link}>
                                                          {item.name}
                                                      </Link>
                                                  </Col>
                                                  <Col md={4}>
                                                      {item.price} * {item.qty} = Rs.{item.price * item.qty}
                                                  </Col>
                                              </Row>
                                          </ListGroup.Item>
                                      ))
                                  }
                              </ListGroup>
                          )
                      }
                  </ListGroup.Item>
               </ListGroup>
           </Col>
           <Col md={4}>
               <Card>
               <br/>
               <h4>ORDER PRICE SUMMARY </h4>
               <br/>
                   <ListGroup>
                       <ListGroup.Item>
                           <Row>
                               <Col>Items Price</Col>
                               <Col>₹{itemsPrice.toFixed(2)}</Col>
                           </Row>
                       </ListGroup.Item>
                       <ListGroup.Item>
                           <Row>
                               <Col>Delivey Charges</Col>
                               <Col>₹{deliveryPrice.toFixed(2)}</Col>
                           </Row>
                       </ListGroup.Item>
                       <ListGroup.Item>
                           <Row>
                               <Col>GST Price</Col>
                               <Col>₹{gstPrice.toFixed(2)}</Col>
                           </Row>
                       </ListGroup.Item>
                       <ListGroup.Item>
                           <Row>
                               <Col>Total Price</Col>
                               <Col>₹{totalPrice.toFixed(2)}</Col>
                           </Row>
                       </ListGroup.Item>
                       <ListGroup.Item>
                           {error && <Message variant='danger'>{error}</Message>}
                       </ListGroup.Item>
                       <ListGroup.Item>
                           <Button type='button' variant='dark' style={{width: '85%'}}
                           disabled={cartItems===0} onClick={placeOrderHandler}>
                                 Place Order
                           </Button>
                       </ListGroup.Item>
                   </ListGroup>
               </Card>
           </Col>
        </Row>
    </Container>
  )
}

export default PlaceOrderScreen;