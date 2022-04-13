import React,{useState , useEffect} from 'react';
import { useNavigate , useParams , Link}  from 'react-router-dom';
import {Button , Row , Col , Image , ListGroup , Container , Card}  from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { getOrderDetails , payOrder  , deliverOrder} from '../actions/orderActions';
import {ORDER_PAY_RESET , ORDER_DELIVER_RESET} from '../constants/orderConstants';
import {BsFillCreditCard2BackFill} from 'react-icons/bs'

const OrderScreen = () => {
  
//   const [sdkReady , setSdkReady] = useState(false);

  const dispatch = useDispatch();
  const params = useParams();
  const orderId = params.id;
  const orderDetails = useSelector(state => state.orderDetails);
  const {loading  , error , order} = orderDetails;
  const orderPay = useSelector(state => state.orderPay);
  const {success , loading : loadingPay} =  orderPay;
  const userLogin = useSelector(state => state.userLogin)
  const {userInfo} = userLogin
  const orderDeliver = useSelector(state => state.orderDeliver);
  const {loading : loadingDeliver ,  success : successDeliver } =  orderDeliver;
   
  useEffect(() => {
    if(!order ||  order._id !== orderId || success || successDeliver){
        dispatch({ type : ORDER_PAY_RESET})
        dispatch({type : ORDER_DELIVER_RESET})
        dispatch(getOrderDetails(orderId))
    }
  },[dispatch,orderId, order , success , successDeliver])

  const payOnlineHandler = () => {
      dispatch(payOrder(order , orderId)); 
  }

  const deliverHandler = () => {
      //mark order is delivered
      dispatch(deliverOrder(order));
  }

  const link = {color: 'black', textDecoration: 'none'} ;
  return (

      loading ? (<Loader/>)
      : error ? (
          <Message variant='danger'>{error}</Message>
      ):<Container style={{paddingTop : '20px',marginBottom:'80px'}}>
        <Row>
           <Col md={8}>
               <ListGroup variant='flush'>
                  <ListGroup.Item>
                      <h2>Order ID : {order._id}</h2>
                      <br/>
                      <p> 
                          <h4>DELIVERY ADDRESS</h4>
                          <p><strong>Name: </strong>{order.user.name}</p>
                          <p><strong>Email: </strong>{order.user.email}</p>
                          <strong>Address:</strong> &nbsp;  
                          {order.shippingAddress.address},{order.shippingAddress.city},
                          {order.shippingAddress.postalCode},{order.shippingAddress.country}
                      </p>
                      {
                          order.isDelivered?(
                              <Message variant = 'success'>Order Delivered At {order.deliveredAt}</Message>
                          ):(
                              <Message variant='danger'>Order Not Delivered</Message>
                          )
                      }
                  </ListGroup.Item>
                  <ListGroup.Item>
                      <h4>PAYMENT METHOD</h4>
                      <p>
                          <strong>Method: </strong> 
                          {order.paymentMethod}
                      </p>
                      {
                          order.isPaid ? (
                              <Message variant='success'>paid on {order.paidAt}</Message>
                          ):(
                              <Message variant='danger'>Not Paid</Message>
                          )
                      }
                  </ListGroup.Item>
                  <ListGroup.Item>
                      <h4>ORDERED ITEMS</h4>
                      {
                          order.orderItems.length === 0 ? (
                             <Message>Your Cart is Empty </Message>
                          ) : (
                              <ListGroup variant='flush' style={{border : '1px solid black'}}>
                                  {
                                      order.orderItems.map((item , index)=>(
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
                               <Col>₹{order.itemsPrice.toFixed(2)}</Col>
                           </Row>
                       </ListGroup.Item>
                       <ListGroup.Item>
                           <Row>
                               <Col>Delivey Charges</Col>
                               <Col>₹{order.deliveryPrice.toFixed(2)}</Col>
                           </Row>
                       </ListGroup.Item>
                       <ListGroup.Item>
                           <Row>
                               <Col>GST Price</Col>
                               <Col>₹{order.gstPrice.toFixed(2)}</Col>
                           </Row>
                       </ListGroup.Item>
                       <ListGroup.Item>
                           <Row>
                               <Col>Total Price</Col>
                               <Col>₹{order.totalPrice.toFixed(2)}</Col>
                           </Row>
                       </ListGroup.Item>
                       <ListGroup.Item>
                       {loadingPay && <Loader/>}
                       {  
                         (!userInfo.isAdmin) && (order.paymentMethod !== "Cash On Delivery")  && (
                         order.isDelivered ? (
                            <ListGroup.Item>
                             <p>Your Order Has been Delivred.
                             <br/>
                             Don't Forget to give a review.</p>
                             </ListGroup.Item>
                         ): order.isPaid ? (
                            <p>Already Paid. <br/>Ready For Delivery</p>
                          ):(
                            <Button onClick = {payOnlineHandler} variant = 'primary' >
                                    <BsFillCreditCard2BackFill style={{color:'brown'}}/> &nbsp; Pay Now Online
                          </Button>
                          )
                         )
                      }
                      {
                          userInfo && userInfo.isAdmin && !order.isPaid &&
                          (<ListGroup.Item>
                              <Button type='button' variant='dark' onClick={payOnlineHandler}>
                                   Mark Order as Paid
                              </Button>
                          </ListGroup.Item> ) 
                      }

                      {loadingDeliver && <Loader/>}
                      {
                          userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered &&
                          (<ListGroup.Item>
                              <Button type='button' variant='dark' onClick={deliverHandler}>
                                   Mark Order as Delivered
                              </Button>
                          </ListGroup.Item> ) 
                      }

                       </ListGroup.Item>
                   </ListGroup>
               </Card>
           </Col>
        </Row>
    </Container>
  )
}

export default OrderScreen;