import React, { useContext, useEffect, useRef, useState } from 'react'
import ForumContext from '../context/ForumContext'
import Post from './Post';
import { useParams } from 'react-router-dom';
import { Button, Col, Container, Row } from 'react-bootstrap';
import AddPost from './AddPost';

export default function PostList() {
  const { posts, setposts } = useContext(ForumContext);
  const { courseId } = useParams();

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
    <Container >
      <Button variant='dark' onClick={() => setOpenPostModal(true)}>Add Post</Button>
      {openPostModal && <AddPost openPostModal={openPostModal} setOpenPostModal={setOpenPostModal} courseId={courseId} />}
      <Row>
        {console.log("in list post")}
        {
          posts?.map((item, index) => {
            return <Col md={6} key={index}><Post post={item} /></Col>
          })
        }
      </Row>
    </Container>
  )
}
