import React from 'react';
import { Container, Row , Col } from 'react-bootstrap';

const FormContainer = ({children}) => {
   
   const cont = {
     padding : '2% 0',
     marginBottom : '40px'
   }

  return (
    <Container style={cont}>
        <Row className="justify-content-md-center">
          <Col xs={12} md={6}>
              {children}
          </Col>
        </Row>
    </Container>
  )
}

export default FormContainer