import React, { useContext, useRef, useState } from 'react'
import ForumContext from '../context/ForumContext';
import { Button, ButtonToolbar, Container, Row, Col, Card } from 'react-bootstrap';
import { IoIosSend } from 'react-icons/io';
import MiniProfile from './MiniProfile';
import { MdOutlineComment } from 'react-icons/md';
import '../stylesheets/comment.css'
export default function CommentDisplay(props) {
  const { comment } = props;
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
    <div>
      <Card >
        <Container>
          <Row>
            <Col md={2} className='circle-img d-flex align-items-center justify-content-center mx-1' >
              <img className='profile-image' src={(comment?.userId.image)} width={40} height={40} alt="Profile Image" />
            </Col>
            <Col md={9} id='comment-card' style={{ backgroundColor: '#e9ecef' }}>
              <Row className='bor'>
                <Col md={10}>
                <div  className='responder'>{(comment?.userId.name)}</div>
                </Col>
                <Col md={2}>
                <p className='responder'>{getTimeSincePostCreation(comment?.dateCreated)} ago</p>
                </Col>
              </Row>
              <p
                    className="fst-italic"
                  // style={{
                  //   backgroundColor: '#e9ecef', // Background color
                  //   padding: '20px', // Padding
                  //   borderRadius: '8px', // Optional: Rounded corners
                  //   borderTopLeftRadius: '0', // No rounded corners for top-left
                  //   marginBottom: '0' // Add this to remove bottom margin
                  // }}
                  >
                    {comment?.content}
                  </p>
            </Col>
          </Row>


          {/* <Row >
            <Col xs={4}>
              <p>({getTimeSincePostCreation(comment?.dateCreated)} ago)</p>
            </Col>
            <Col>
              <Row style={{ backgroundColor: '#e9ecef' }}>
                <Col xs={8} md={10} className=' p-0'>
                  <div className=' p-0 mt-2'>{(comment?.userId.name)}</div>
                </Col>
                <Col xs={1}>
                  <MdOutlineComment />
                </Col>
                <Col>
                  
                </Col>
              </Row>
            </Col>
          </Row> */}
          <div className='d-flex justify-content-between'>
            <Button
              onClick={openCommentInput}
              style={{
                background: 'none',
                border: 'none',
                color: 'inherit',
                marginRight: '20px',
                padding: 0,
                margin: 0,
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#e9ecef'} // Change background on hover
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'} // Reset background when not hovered
            >
              reply
            </Button>
            <Button
              onClick={getMyComments}
              style={{
                background: 'none',
                border: 'none',
                color: 'inherit',
                padding: 0,
                margin: 0,
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#e9ecef'} // Change background on hover
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'} // Reset background when not hovered
            >
              comments
            </Button>
          </div>
          {commentFlag && comments.map((comment, index) => {
            return <CommentDisplay key={index} comment={comment} />
          })}
          {inputFlag && <div className='d-flex'>
            <input type='text' className='form-control' placeholder='type here...' ref={inputRef}></input>
            <IoIosSend size={25} style={{ cursor: 'pointer' }} onClick={handleAddComment} />
          </div>}
        </Container>
      </Card>
    </div>
  )
}

