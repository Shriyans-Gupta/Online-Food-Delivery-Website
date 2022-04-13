import React from "react";
import {Col , Card} from "react-bootstrap";
import {Link} from "react-router-dom";
import Rating from './Rating';
import "./FoodCard.css";

function FoodCard(props){
    return (
        <>
            <Col md={4}>
                   <Card style={{boxShadow: "rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px"}}>
                   <Link className='link' to = {`/foods/${props.id}`}>
                       <Card.Img  className="image" src={props.img} alt="picture" style={{padding : '5px'}} />
                    </Link>
                       <Card.Body>
                       <Link className='link' to = {`/foods/${props.id}`}>
                            <Card.Title>{props.name}</Card.Title>
                       </Link>
                           <p>{props.category}</p>
                           <p>{props.brand}</p>
                           <Card.Text>
                             <Rating 
                                value= {props.rating}
                                text = {`${props.noReviews} reviews`} 
                             />
                           </Card.Text>
                           <Card.Footer>Rs: {props.price}</Card.Footer>
                       </Card.Body>
                   </Card>
            </Col>
        </>
    )
}

export default FoodCard ;