import React, { useState } from 'react';
import { Button, Container, Nav, Navbar, Offcanvas } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../stylesheets/sidebar.css'
import { GiHamburgerMenu } from 'react-icons/gi';
const Sidebar = ({ courseId, isOpen, setIsOpen }) => {

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <Button onClick={toggleSidebar} variant='light'>
        <GiHamburgerMenu />
      </Button>
      <Offcanvas show={isOpen} onHide={toggleSidebar} placement="start" backdrop={false} scroll={true}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Menu</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Navbar bg="light" data-bs-theme="light" className='d-flex flex-column'>
            <Container className="flex-column">
              <Navbar.Brand href={`/course_details/${courseId}`}>Course</Navbar.Brand>
              <Nav className="me-auto flex-column">
                <Nav.Link href={`/course_details/${courseId}/summeries`}>Summeries</Nav.Link>
                <Nav.Link href={`/course_details/${courseId}/forum`}>Forum</Nav.Link>
                <Nav.Link href={`/course_details/${courseId}/sharedLearning`}>Shared Learning</Nav.Link>
              </Nav>
            </Container>
          </Navbar>
        </Offcanvas.Body>
      </Offcanvas>
    </>

  );
};

export default Sidebar;
