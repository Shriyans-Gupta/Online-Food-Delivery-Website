import React,{useState,useEffect} from "react";
import { Link, useParams,useNavigate} from 'react-router-dom';
import { useDispatch,useSelector } from "react-redux";
import { Row, Col, Image, ListGroup, Container, Button ,Card , Form} from 'react-bootstrap';
import { listProductDetails , createProductReview } from "../actions/productActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Rating from "../components/Rating";
import { PRODUCT_REVIEW_RESET } from "../constants/productConstants";

const FoodScreen = () => {
    
    const params = useParams();
    const navigate = useNavigate();
    const id = params.id;
    const [qty, setQty] = useState(1);
    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState('')
    const dispatch = useDispatch();
    const productDetails = useSelector(state => state.productDetails)
    const {loading,error,product} = productDetails
    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin
    const productCreateReview = useSelector((state) => state.productCreateReview)
    const {
      success: successProductReview,
      loading: loadingProductReview,
      error: errorProductReview,
    } = productCreateReview
   
    useEffect(() => {
          if (!product._id || product._id !== id || successProductReview) {
            dispatch(listProductDetails(id))
            dispatch({ type: PRODUCT_REVIEW_RESET })
            setRating(0)
            setComment('')
          }      
    },[dispatch,id , successProductReview , product]);

    const addToCartHandler = () => {
        navigate(`/cart/${id}?qty=${qty}`)
    }

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(
          createProductReview(id, {
            rating,
            comment,
          })
        )
      }
    
    const box = {boxShadow: "rgba(136, 165, 191, 0.48) 6px 2px 16px 0px, rgba(255, 255, 255, 0.8) -6px -2px 16px 0px"}   
    

    return (
       

       <>  
            <Link to='/'  style={{padding : '8.5%'}}>
                <Button className="bg-dark"  style={{margin : "10px 0 0 0"}}>Go Back</Button>
            </Link>
            {
               loading ? (
                   <Loader/>
               ):error ? (
                <Message variant='danger'>{error}</Message>
               ) :(
                <Container style={{marginBottom: "80px" , padding :"1.5% 3%"}}>
            <Row>
               
                <Col md={6} >  
                     <Card style={{padding : '0 4.5%'}} border='light'>
                      <Image src={product.image} alt={product.name}  style={box} fluid rounded/>
                    </Card>
                </Col> 
                <Col md={3} >
                <ListGroup style={box}>
                    <ListGroup.Item>
                         <h3>{product.name}</h3>
                    </ListGroup.Item>
                    <ListGroup.Item>
                          <Rating 
                              value = {product.rating}
                              text = {`${product.noReviews} reviews`}
                          />
                    </ListGroup.Item>
                    <ListGroup.Item>
                           <strong>Price:</strong> Rs.{product.price}
                    </ListGroup.Item>
                    <ListGroup.Item>
                            <strong>Description :</strong>{product.description}
                    </ListGroup.Item>
                </ListGroup>
                </Col>   
                <Col md={3}>
                    <Card style={box}>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <Row>
                                   <Col>price:</Col>
                                   <Col><strong>₹{product.price} </strong></Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Status:</Col>
                                     <Col>
                                         {product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}
                                    </Col>
                                </Row>
                             </ListGroup.Item>
                             {product.countInStock > 0 && (
                            <ListGroup.Item>
                                 <Row>
                                   <Col>Quantity</Col>
                                   <Col>
                                       <Form.Control
                                          as='select'
                                          value={qty}
                                          onChange={(e) => setQty(e.target.value)}
                                         >
                                         {[...Array(product.countInStock).keys()].map(
                                              (x) => (
                                              <option key={x + 1} value={x + 1}>
                                                {x + 1}
                                              </option>
                                               )
                                          )}
                                         </Form.Control>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                             )}
                                    
                            <ListGroup.Item>
                                <Button 
                                onClick = {addToCartHandler}
                                className="bg-dark" style={{width:"75%"}}>
                                Add to Cart
                                </Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>

                </Col> 
            </Row>
            <br/>
            <br/>
            <Row>
            <Col md={6}>
              <h2>Reviews</h2>
              {product.reviews.length === 0 && <Message>No Reviews</Message>}
              <ListGroup variant='flush'>
                {product.reviews.map((review) => (
                  <ListGroup.Item key={review._id}>
                    <strong>{review.name}</strong>
                    <br/>
                    <Rating value={review.rating} />
                    <p>{review.createdAt.substring(0, 10)}
                    <br/>{review.comment}</p>
                  </ListGroup.Item>
                ))}
               </ListGroup> 
             </Col>
             <Col md={6}>
              <ListGroup>
                <ListGroup.Item>
                  <h2>Write a Customer Review</h2>
                  {successProductReview && (
                    <Message variant='success'>
                      Review submitted successfully
                    </Message>
                  )}
                  {loadingProductReview && <Loader />}
                  {errorProductReview && (
                    <Message variant='danger'>{errorProductReview}</Message>
                  )}
                  {userInfo ? (
                    <Form onSubmit={submitHandler}>
                      <Form.Group controlId='rating'>
                        <Form.Label>Rating</Form.Label>
                        <Form.Control
                          as='select'
                          value={rating}
                          onChange={(e) => setRating(e.target.value)}
                        >
                          <option value=''>Select...</option>
                          <option value='1'>1 - Poor</option>
                          <option value='2'>2 - Fair</option>
                          <option value='3'>3 - Good</option>
                          <option value='4'>4 - Very Good</option>
                          <option value='5'>5 - Excellent</option>
                        </Form.Control>
                      </Form.Group>
                      <Form.Group controlId='comment'>
                        <Form.Label>Comment</Form.Label>
                        <Form.Control
                          as='textarea'
                          row='5'
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                      <Button
                        type='submit'
                        variant='dark'
                      >
                        Submit
                      </Button>
                    </Form>
                  ) : (
                    <Message>
                      Please <Link to='/login'>sign in</Link> to write a review{' '}
                    </Message>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
            </Container>
               )
            }
        </>
    );
}

export default FoodScreen;