import React, { useContext, useEffect, useRef, useState } from 'react'
import ForumContext from '../context/ForumContext'
import Post from './Post';
import { useParams } from 'react-router-dom';
import { Button, Col, Container, Row } from 'react-bootstrap';
import AddPost from './AddPost';
import Sidebar from './Sidebar';
import MainNavbar from './MainNavbar';
import '../stylesheets/postlist.css'

import CourseContext from '../context/CourseContext';
import Footer from './Footer';
export default function PostList() {
  const { posts, setposts } = useContext(ForumContext);
  const { courseId, courseName } = useParams();
  const [isOpen, setIsOpen] = useState(false); // State to manage the sidebar's open/close state

  const [openPostModal, setOpenPostModal] = useState(false);

  const getPosts = async (courseId) => {
    const data = await fetch('http://localhost:3000/forums/posts/' + courseId, {
      headers: {
        "authorization": localStorage.getItem("token")
      }
    })
    const res = await data.json();
    console.log({ res });
    setposts(res);
  }

  useEffect(() => {
    getPosts(courseId);
  }, [])

  return (
    <>
      <MainNavbar />
      <Sidebar courseId={courseId} courseName={courseName} isOpen={isOpen} setIsOpen={setIsOpen} />
      <div className="d-flex justify-content-center align-items-center ">

        <Container className={`course-detail-page ${isOpen ? 'sidebar-open' : ''} `}>
          <Row className="mt-4 d-flex justify-content-between align-items-center">
            <Col md={7} xs={10}>
              <h1 style={{ color: '#2D3092', fontWeight: 'bold' }}>Join the Discussion</h1>
              <p> Explore and Contribute to Our Course Forums!</p>
            </Col>
            <Col md={2} >
              <Button className='circular-button' onClick={() => setOpenPostModal(true)}>Start <br /> new forum</Button>
            </Col>
            {openPostModal && <AddPost openPostModal={openPostModal} setOpenPostModal={setOpenPostModal} courseId={courseId} />}

          </Row>
          {/* <Row className='border'> */}
          {
            posts?.map((item, index) => {
              return <Row key={index}  ><Col md={12} xs={12} sm={12}><Post post={item} /></Col></Row>
            })
          }
          {/* </Row> */}
        </Container>
      </div>
      <Footer/>
    </>

  )
}
