import React , { useEffect} from 'react';
import {LinkContainer} from 'react-router-bootstrap';
import {useNavigate} from 'react-router-dom';
import {Table , Button , Container} from 'react-bootstrap';
import {useDispatch , useSelector} from 'react-redux';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { listOrders } from '../actions/orderActions';
import {ImCross} from 'react-icons/im';

const OrderListScreen = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const orderList = useSelector(state => state.orderList)
    const {loading , error , orders} = orderList;
    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin;
    useEffect(() => {
        if(userInfo && userInfo.isAdmin){
            dispatch(listOrders())
        }else{
            navigate('/login');
        }
        
    },[dispatch,navigate,userInfo]);


     const center = { textAlign : 'center'}
    return (
      <Container style={{marginTop : '30px' , marginBottom : '80px'}}>
         <h2>ORDERS</h2>
         {
             loading ? <Loader/> : error ? <Message variant='danger'> {error} </Message> : (
                 <Table striped bordered responsive hover className='table-sm' >
                     <thead>
                         <th style={center}>ID</th>
                         <th style={center}>USER</th>
                         <th style={center}>DATE</th>
                         <th style={center}>TOTAL</th>
                         <th style={center}>PAID</th>
                         <th style={center}>DELIVERED</th>
                         <th style={center}>VIEW DETAILS</th>
                     </thead>
                     <tbody>
                         {
                            orders.reverse().map(order => (
                                 <tr key = {order._id}>
                                     <td>{order._id}</td>
                                     <td style={center}>{order.user && order.user.name}</td>
                                     <td style={center}>{order.createdAt.substring(0,10)}</td>
                                     <td style={center}>₹{order.totalPrice}</td>
                                     <td style={center}>{
                                       order.isPaid ? (order.paidAt.substring(0,10)) : (
                                        <ImCross style={{ color : 'red'}} />
                                       )
                                         }
                                      </td>
                                      <td style={center}>{
                                       order.isDelivered ? (order.deliveredAt.substring(0,10)) : (
                                        <ImCross style={{ color : 'red'}} />
                                       )
                                         }
                                      </td>
                                     <td style={center}>
                                             <LinkContainer to={`/order/${order._id}`}>
                                                <Button variant='light' className='btn-sm'>
                                                    DETAILS
                                                </Button>
                                             </LinkContainer>
                                     </td>
                                 </tr>
                             ))
                         }
                     </tbody>
                 </Table>
             )
         }
      </Container>
  )
}

export default OrderListScreen;