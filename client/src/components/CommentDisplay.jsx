import React, { useContext, useRef, useState } from 'react'
import ForumContext from '../context/ForumContext';
import { Button, ButtonToolbar, Container, Row, Col, Card } from 'react-bootstrap';
import { IoIosSend } from 'react-icons/io';
import MiniProfile from './MiniProfile';
import { MdOutlineComment } from 'react-icons/md';
// import ProfileContext from '../../context/ProfileContext';

import '../stylesheets/comment.css'
import ProfileContext from '../context/ProfileContext';
export default function CommentDisplay(props) {
  const { comment } = props;
  const {profileData} = useContext(ProfileContext)
  // console.log("comment in displayyyyyyy", comment);
  const [inputFlag, setinputFlag] = useState(false)
  const [commentFlag, setcommentFlag] = useState(false)
  const [comments, setcomments] = useState([])
  const { addCommentToComment, getCommentsOfComment, getTimeSincePostCreation } = useContext(ForumContext);
  const inputRef = useRef(null);
  const openCommentInput = () => {
    setinputFlag(true);
  }
  const getMyComments = async () => {
    const res = await getCommentsOfComment(comment?._id);
    console.log({ res });
    setcomments(res)
    setcommentFlag(true)
  }
  const handleAddComment = async () => {
    const { value } = inputRef.current;
    const res = await addCommentToComment(comment?._id, value);
    await getMyComments();
    setcomments([...comments, res]);
    inputRef.current.value = "";
  }
  return (
    <div className='ms-5'>
      <div >
       
          <Row>
            <Col md={1} className=' circle-img d-flex align-items-top justify-content-top' >
              <img className='profile-image' src={(comment?.userId.image) ||(profileData.image)} width={40} height={40} alt="Profile Image" />
            </Col>
            <Col md={9} id='comment-card'>
              <div id='comment-card' style={{ backgroundColor: '#e9ecef' }} className='p-2' >
                <Row>
                  <Col md={10}>
                    <div id='responder'>{(comment?.userId.name) || (profileData.name)}</div>
                  </Col>
                  <Col md={2}>
                    <p className='time'>{getTimeSincePostCreation(comment?.dateCreated)}</p>
                  </Col>
                </Row>
                <p className='ms-2'>{comment?.content}</p>
              </div>
              <Row>
                <Col xs={3} md={2} className='d-flex align-items-end justify-content-end p-1'>
                  <button id='replaybtn' className='comment-btn' onClick={openCommentInput}>
                    replay
                  </button>
                </Col> 
                <Col xs={7} md={9} className=' d-flex align-items-start justify-content-start p-1'>
                  <button id='commentsbtn' className='comment-btn' onClick={getMyComments}>
                    comments
                  </button>
                </Col>
              </Row>
            </Col>

          </Row>
          {commentFlag && comments.map((comment, index) => {
            return <CommentDisplay key={index} comment={comment} />
          })}
          {inputFlag && <div className='d-flex m-2'>
            <input type='text' className='form-control' placeholder='Your comment...' ref={inputRef}></input>
            <Button id='send-btn' onClick={handleAddComment} > <IoIosSend size={20} style={{ cursor: 'pointer' }} color='black' /></Button>
          </div>}
      </div>
    </div>
  )
}

