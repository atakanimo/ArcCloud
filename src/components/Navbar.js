import React from 'react';
import {Navbar, Container, Nav} from 'react-bootstrap';
import GetDynamicDimensions from '../helper/GetDynamicDimensions';

export default function NavbarComponent() {
  const [screenSize, getDimension] = GetDynamicDimensions();
  const {dynamicWidth, dynamicHeight} = screenSize;

  return (
    <Navbar bg="light" variant="light" style={{height: dynamicHeight / 12}}>
      <Container>
        <Nav className="me-auto">
          <Nav.Link href="#home">Home</Nav.Link>
          <Nav.Link href="#features">Features</Nav.Link>
          <Nav.Link href="#pricing">Pricing</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}
