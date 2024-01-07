import React, { useContext, useEffect, useRef, useState } from 'react'
import ForumContext from '../context/ForumContext'
import Post from './Post';
import { useParams } from 'react-router-dom';
import { Button, Col, Container, Row } from 'react-bootstrap';
import AddPost from './AddPost';
import Sidebar from './Sidebar';

export default function PostList() {
  const { posts, setposts } = useContext(ForumContext);
  const { courseId } = useParams();
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
      <Sidebar courseId={courseId} isOpen={isOpen} setIsOpen={setIsOpen} />
      <div className="d-flex justify-content-center align-items-center ">

        <Container style={{ width: '60%', fontFamily: 'Arial, sans-serif' }} className={`course-detail-page ${isOpen ? 'sidebar-open' : ''} `}>
          <Row className="mt-4 d-flex justify-content-between align-items-center">
            <Col xs={7}>
              <h2 style={{ color: '#2D3092', fontWeight: 'bold' }}>Course Forum</h2>
            </Col>
            <Col md={3} >
              <Button style={{ backgroundColor: '#5055d1', width: '90%' }} onClick={() => setOpenPostModal(true)}>Create Post</Button>
            </Col>
            {openPostModal && <AddPost openPostModal={openPostModal} setOpenPostModal={setOpenPostModal} courseId={courseId} />}

          </Row>
          <Row className='my-4'>
            {
              posts?.map((item, index) => {
                return <Row key={index} ><Post post={item} /></Row>
              })
            }
          </Row>
        </Container>
      </div>
    </>

  )
}
