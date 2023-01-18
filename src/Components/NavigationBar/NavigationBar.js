import React from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';  

function NavigationBar() {
  return (
    <>
      <Navbar bg="light">
        <Container>
          <Navbar.Brand href="#home">Checklists App</Navbar.Brand>
        </Container>
      </Navbar>
    </>
  );
}

export default NavigationBar