import React,{useEffect} from "react";
import FoodCard from "../components/FoodCard";
import {Row , Container}  from "react-bootstrap";
import { useDispatch , useSelector } from "react-redux";
import { listProducts } from "../actions/productActions";
import { useParams } from "react-router-dom";
import "./HomeScreen.css";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";
import Message from "../components/Message";

const HomeScreen = () => {
    

   const params = useParams(); 
   const keyword = params.keyword;

    const dispatch = useDispatch()

    const productList = useSelector(state => state.productList)
    const {loading , error , products}  = productList

    useEffect(() => {
        dispatch(listProducts(keyword))
         
    },[dispatch , keyword]);

    return (
        <>   {keyword && <Link to='/' className='btn btn-light' style={{margin : '0' , marginLeft: '100px' , 
             marginTop: '10px'}}>
                  Go Back
           </Link> }
           { 
             loading ? (
                <Loader/>
             ) : error ? (
                 <Message variant='danger'>{error}</Message>
             ):(
                <Container className="cont"> 
        <Row>
             {products.map((food) => (
               <FoodCard 
               key = {food._id}
               id = {food._id}
               img = {food.image}
               name = {food.name}
               brand = {food.brand}
               category = {food.category}
               rating = {food.rating}
               noReviews = {food.noReviews}
               price = {food.price}
               />
           )
           )}
        </Row>
           
        </Container>

             )
         }
         {
                products.length===0 && <Message variant='danger'>Sorry No Product Found.</Message>
            }
        </>   
    )
}

export default HomeScreen;
