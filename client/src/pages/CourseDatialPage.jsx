import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import '../stylesheets/courseDetailsPage.css'; // Import your CSS file
import { Button, Container } from 'react-bootstrap';
import { GiHamburgerMenu } from "react-icons/gi";

export default function CourseDatialPage() {
  const { courseId } = useParams();

  const [isOpen, setIsOpen] = useState(false); // State to manage the sidebar's open/close state

  return (
    <div >
      <Sidebar courseId={courseId} isOpen={isOpen} setIsOpen={setIsOpen} />
      <Container className={`course-detail-page ${isOpen ? 'sidebar-open' : ''}`}>
        <h1>Course {courseId}</h1>
      </Container>
    </div>
  );
}
