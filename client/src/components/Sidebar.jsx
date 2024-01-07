import React, { useState } from 'react';
import { Button, Container, Nav, Navbar, Offcanvas } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../stylesheets/sidebar.css'
import { GiHamburgerMenu } from 'react-icons/gi';
import { MdOutlineForum } from "react-icons/md";
import { MdGroups2 } from "react-icons/md";
import { MdSummarize } from "react-icons/md";

const Sidebar = ({ courseId, courseName, isOpen, setIsOpen }) => {

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <Button onClick={toggleSidebar} id='burgerBtn'>
        <GiHamburgerMenu size={20} />
      </Button>
      <Offcanvas show={isOpen} onHide={toggleSidebar} placement="start" backdrop={true} scroll={false}>
        <Offcanvas.Header closeButton>
          <a id='linkCourse' href={`/course_details/${courseId}/${courseName}`} style={{ textDecoration: 'none', color: 'inherit' }}> {/* Making the title clickable */}
            <Offcanvas.Title>{courseName} Course</Offcanvas.Title>
          </a>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Navbar data-bs-theme="light" className='d-flex flex-column'>
            <Container>
              <Nav className="me-auto flex-column">
                <Nav.Link className='my-2 blueColor' href={`/course_details/${courseId}/${courseName}/summeries`}><MdSummarize size={35} className='bg-white p-2 me-1 shadow' style={{ borderRadius: '25%', color: '#2d3092' }} /> Summeries</Nav.Link>
                <Nav.Link className='my-2 blueColor' href={`/course_details/${courseId}/${courseName}/forum`}><MdOutlineForum size={35} className='bg-white p-2 me-1 shadow' style={{ borderRadius: '25%', color: '#2d3092' }} /> Forum</Nav.Link>
                <Nav.Link className='my-2 blueColor' href={`/course_details/${courseId}/${courseName}/sharedLearning`}><MdGroups2 size={35} className='bg-white p-2 me-1 shadow' style={{ borderRadius: '25%', color: '#2d3092' }} /> Shared Learning</Nav.Link>
              </Nav>
            </Container>
          </Navbar>
        </Offcanvas.Body>
      </Offcanvas>
    </>

  );
};

export default Sidebar;
