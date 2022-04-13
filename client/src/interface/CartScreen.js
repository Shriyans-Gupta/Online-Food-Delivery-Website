import React , {useEffect} from 'react' ;
import { Link , useParams , useLocation , useNavigate} from 'react-router-dom';
import {Row , Col , Image , Form , Card , ListGroup , Button, Container} from 'react-bootstrap';
import { useDispatch , useSelector } from 'react-redux';
import { addToCart , removeFromCart } from '../actions/cartActions';
import {MdDelete} from "react-icons/md";
import Message from '../components/Message';

const CartScreen = () => {
  const params = useParams();
  const productId = params.id;
  const location = useLocation();
  const navigate = useNavigate();
  const qty = new URLSearchParams(location.search).get('qty');

  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart);
  const {cartItems} = cart;

  useEffect(() => {
        if(productId){
            dispatch(addToCart(productId,qty));
        }
  },[dispatch,productId, qty])

  const removeFromCartHandler = (id) => {
          dispatch(removeFromCart(id));
  }

  const checkOutHandler = () => {
    navigate('/login?redirect=/shipping');
  }

  return (
    <Container style={{marginTop: '20px',marginBottom: '50px'}}>
    <Row>
      <Col md={8} >
           <h2>Selected Items</h2>
           {cartItems.length === 0 ?(
             <Message>Your cart item is Empty . Select an item.</Message>
           ):(
             <ListGroup variant='flush' style={{border : '1px solid black'}}> 
                {cartItems.map(item => (
                  <ListGroup.Item key = {item.product_id}>
                    <Row>
                      <Col md={2}>
                        <Image src={item.image} alt={item.name} thumbnail />
                      </Col>
                      <Col md={3}>
                        <Link to={`/foods/${item.product_id}`} style={{textDecoration: 'none',color: 'black'}}>{item.name}</Link>
                      </Col>
                      <Col md={2}>
                         Rs. {item.price}
                      </Col>
                      <Col md={2}>
                      <Form.Control
                              as='select'
                              value={item.qty}
                              onChange={(e) => dispatch(addToCart(item.product_id,Number(e.target.value)))}
                        >
                                         {[...Array(item.countInStock).keys()].map(
                                              (x) => (
                                              <option key={x + 1} value={x + 1}>
                                                {x + 1}
                                              </option>
                                               )
                                          )}
                         </Form.Control>                       
                      </Col>
                      <Col md={2}>
                         &nbsp; &nbsp;
                        <Button onClick={() =>
                        removeFromCartHandler(item.product_id)} variant='warning'>
                        <MdDelete/>
                        </Button>  
                      </Col>
                    </Row>
                  </ListGroup.Item>
                ))}
             </ListGroup>
           )}
      </Col>
      <Col md={4}>
          <br/><br/>
         <Card>
           <ListGroup variant='flush'>
              <ListGroup.Item>
                <h4>
                  Subtotal {cartItems.reduce((acc,item)=> parseInt(acc) + parseInt(item.qty),0)} items
                </h4>
              </ListGroup.Item>
              <ListGroup.Item>
                <h4>
                   ₹
                  {cartItems.reduce((acc,item)=> acc + item.qty * item.price,0).toFixed(2)}
                </h4>
              </ListGroup.Item>
              <ListGroup.Item>
                <Button variant='dark' style={{width: '100px'}} disabled={cartItems.length === 0}
                onClick = {checkOutHandler}>
                    proceed 
                </Button>
              </ListGroup.Item>
           </ListGroup>
         </Card>        
      </Col>
    </Row>
    </Container>
  )
}

export default CartScreen ;