import React, { useState, useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import '../stylesheets/courseDetailsPage.css'; // Import your CSS file
import { Button, Container } from 'react-bootstrap';
import { GiHamburgerMenu } from "react-icons/gi";
import CourseContext from '../context/CourseContext';
import '../stylesheets/coursePage.css'
import MainNavbar from '../components/MainNavbar';
import Footer from '../components/Footer';

export default function CourseDatialPage() {
  const { courseId, courseName } = useParams();
  const { getCourses, setcourses } = useContext(CourseContext);
  const [isOpen, setIsOpen] = useState(false); // State to manage the sidebar's open/close state
  useEffect(() => {
    getCourses();
  }, [])

  return (
    <div >
      <MainNavbar />
      <Sidebar courseId={courseId} courseName={courseName} isOpen={isOpen} setIsOpen={setIsOpen} />
      <div>

      <Container className={`text-center course-detail-page ${isOpen ? 'sidebar-open' : ''}`} >
        <h1 className='display-5 '>Wellcom to {courseName} Course</h1>
        <div style={{ position: 'relative', textAlign: 'center', margin: '0 auto' }}>
          <img id="paint-stain" src='https://cdn.pixabay.com/photo/2014/04/03/10/26/ink-310433_1280.png'
            // style={{ width: '400px', position: 'absolute', top: '0', left: '380px' }}
            alt="First Image"
          />
          <img id="teacher-img"
            src='https://cdn.pixabay.com/animation/2022/11/13/07/16/07-16-26-181_512.gif'
            // style={{ width: '300px', position: 'absolute', top: '80px', left: '410px' }}
            alt="Second Image"
          />
        </div>
        <p className='fs-3' id='lack-box'
        // style={{ position: 'absolute', top: '460px', left: '400px' }} 
        >Academix wish you luck!</p>
      </Container>
      </div>
      {/* <Footer style={{ top: '0'}} /> */}
    </div>
  );
}
