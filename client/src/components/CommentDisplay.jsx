import React, { useContext, useRef, useState } from 'react'
import ForumContext from '../context/ForumContext';

export default function CommentDisplay(props) {
  const { comment } = props;
  const [inputFlag, setinputFlag] = useState(false)
  const [commentFlag, setcommentFlag] = useState(false)
const [comments, setcomments] = useState([])
  const {addCommentToComment,getCommentsOfComment}=useContext(ForumContext);
  const inputRef=useRef(null);
  const openCommentInput = () => {
    setinputFlag(true);
  }
  const getMyComments = async () => {
    const res = await getCommentsOfComment(comment._id);
    console.log({res});
    // const temp=res.map((comment)=>comment.content)
    // console.log({temp});
    setcomments(res)
    // setbtnCloseFlag(true)
    setcommentFlag(true)
    // setbtnOpenFlag(false)
}
  const handleAddComment=async()=>{
    const { value } = inputRef.current;
    const res=await addCommentToComment(comment._id, value);
    setcomments([...comments,res]);
    inputRef.current.value="";
  }
  return (
    <div style={{margin:"25px"}}>
      {console.log({comment})}
      <p className="fst-italic">{comment.content}</p>
      <button className='btn btn-black' onClick={getMyComments}>View responds</button>
      <button className='btn btn-danger' onClick={openCommentInput}>add comment</button>
      {commentFlag&&comments.map((comment,index)=>{
        // return <p style={{margin:"25px"}} key={index}>{comment.content}</p>
        return <CommentDisplay key={index} comment={comment}/>
      })}
      {inputFlag&&<div>
        <input type='text' className='form-control' placeholder='type here...' ref={inputRef}></input>
        <button className='btn btn-info' onClick={handleAddComment}>send</button>
        </div>}
    </div>
  )
}
