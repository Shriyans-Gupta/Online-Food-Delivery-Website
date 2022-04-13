import React  from "react";
import {Navbar, Nav, Container} from "react-bootstrap";
import {LinkContainer} from "react-router-bootstrap";
import {MdLocalOffer} from "react-icons/md"

const Top = () => {

   const nav={
      backgroundColor : '#FF9F45',
      color : 'white',
      paddingLeft : '0'
   }

    return (
        <>
        <Navbar style={nav} variant="dark">
             <Container>
             <h3>   
                   <MdLocalOffer /> &nbsp; 
                   Order Food from your Doorstep
             </h3>
                 <Nav>  
                    <LinkContainer to="/">
                        <Nav.Link >Home</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="/about">
                        <Nav.Link >About Us</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="/contact">
                        <Nav.Link >Contact</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="/policy">
                         <Nav.Link >Terms and Policy</Nav.Link>
                    </LinkContainer>
                    
                 </Nav>
             </Container>
        </Navbar>
        </>
    );
};

export default Top;