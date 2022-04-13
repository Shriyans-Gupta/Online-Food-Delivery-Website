import React from "react";
import {Row, Col, Button,Image , Carousel} from "react-bootstrap";
import "./HomePage.css";
import {FaApple, FaGooglePlay} from "react-icons/fa";
import HomeScreen from "./HomeScreen";

const HomePage = () => {
    return (
        <>
             
       <Carousel className="title" pause='hover' interval={2500}>
          <Carousel.Item>
          <Row>
            <Col lg={6}>
                <h1 className="header">Order Delicious and Tasty meals in few minutes.</h1>
                <Button className="btn" variant="dark" style={{marginRight:"50px"}}><FaGooglePlay/>  Download</Button>
                <Button className="btn" variant="light"><FaApple/> Download</Button>
            </Col>
            <Col lg={6}>
                <Image
                    src="images/title.jpg"
                    alt="title"
                    style={{height: "300px", width : "400px" , borderRadius: "25px"}}
                />
              </Col>
             </Row>
            </Carousel.Item>
            <Carousel.Item>
          <Row>
            <Col lg={6}>
                <h1 className="header text">Get The Latest Smoky and Tasty and Crispy Veg and Non-Veg Burgers From KFC.</h1>
            </Col>
            <Col lg={6}>
                <Image
                    src="images/sample_burger.jpg"
                    alt="title"
                    style={{height: "300px", width : "450px" , borderRadius: "25px"}}
                />
              </Col>
             </Row>
            </Carousel.Item>
            <Carousel.Item>
          <Row>
            <Col lg={6}>
                <h1 className="header text">Delicious,Mouthwatering and Cheesy Veg and Non-Veg Pizza From Dominos.</h1>
            </Col>
            <Col lg={6}>
                <Image
                    src="images/sample_pizza.jpeg"
                    alt="title"
                    style={{height: "300px", width : "450px" , borderRadius: "25px"}}
                />
              </Col>
             </Row>
            </Carousel.Item>
        </Carousel>
        <HomeScreen/>
        </>
        
    )
}

export default HomePage;