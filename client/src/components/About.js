import React from "react" ;
import {Container, Row , Col , Image} from "react-bootstrap";

const About = () => {
    return (
        <>
            <Container className="cont" style={{textAlign:'left'}}>
                <h1>About Us</h1>
                <Row className="row"> 
                    <Col md={6} className="col">
                    Thanks to the food delivery apps, you can now get your favourite burger delivered to your doorstep from your choice of restaurant in town. Online food delivery platforms are expanding choice and convenience along with great deals and discounts, allowing customers to order from a wide array of restaurants with a single tap of their mobile phone. As a result, the food delivery business is fast catching up across markets of America, Asia, Europe, and the Middle East.
                    </Col>
                    <Col md={6} className="col">
                    According to “Online Food Delivery Services Global Market Report 2020-30”, the global online food delivery services market is expected to grow from USD111.32 billion in 2020 at a growth rate of 3.61%. However, 2020’s growth slump is mainly due to the economic slowdown across countries owing to the pandemic outbreak and the measures to contain it. The market is still expected to grow and reach USD154.34 billion in 2023 at CAGR of 11.51%.
                    </Col>
                </Row>
                <br/><br/>
                <Row>
                    <Col md={6}>
                        <Image src="/images/burger.jpg" />
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default About;