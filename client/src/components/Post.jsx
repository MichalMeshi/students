import React, { useContext, useEffect, useRef, useState } from 'react'
import CommentDisplay from './CommentDisplay';
import ForumContext from '../context/ForumContext';

// export default function Post(props) {
//     const cardRef = useRef(null)
//     const [flag, setflag] = useState(false)
//     const [commentFlag, setcommentFlag] = useState(false);

//     const { post, postId } = props;
//     const openComment = () => {
//         setflag(!flag)

//     }
//     const displayComments = () => {
//         setcommentFlag(!commentFlag)
//         // setcardId(cardRef.current.id);
//     }

//     return (
//         <div id={post._id} className="card" ref={cardRef}>
//             <div className="card-header">
//                 Computer Science
//             </div>
//             <div className="card-body">
//                 <h5 className="card-title">{post.title}</h5>
//                 <p className="card-text">{post.info}</p>
//                 {/* <button className="btn btn-primary" onClick={openComment}>{btnText[flag]}</button> */}
//                 <button className="btn btn-primary" onClick={displayComments}>View responds</button>
//                 {console.log(postId)}
//                 {commentFlag && <CommentDisplayList parentId={post._id} flag={commentFlag} />}
//                 {/* {flag&&<Comment parentId={post._id}/>} */}

//             </div>
//         </div>
//     )
// }



export default function Post(props) {
    const { post } = props;
    const [comments, setcomments] = useState([]);
    const [commentFlag, setcommentFlag] = useState(false)
    const [btnCloseFlag,setbtnCloseFlag]=useState(false);
    const [btnOpenFlag,setbtnOpenFlag]=useState(true);
    const { getCommentsOfPost, addCommentToPost } = useContext(ForumContext);
    const inputRef = useRef(null);
    const getMyComments = async () => {
        const res = await getCommentsOfPost(post._id);
        console.log({res});
        // const temp=res.map((comment)=>comment.content)
        // console.log({temp});
        setcomments(res)
        setbtnCloseFlag(true)
        setcommentFlag(true)
        setbtnOpenFlag(false)
    }
    const toggleCommentFlag=()=>{
        setcommentFlag(false)
        setbtnCloseFlag(false)
        setbtnOpenFlag(true)
    }
    const handleAddComment = async() => {
        const { value } = inputRef.current;
        const res= await addCommentToPost(post._id, value);
        setcomments([...comments,res]);
        inputRef.current.value="";

    }
    useEffect(() => {
        // getMyComments();
        return () => { }
    }, [])
    return (
        <div className="card">
            <div className="card-header">
                {post.field}
            </div>
            <div className="card-body">
                <h5 className="card-title">{post.title}</h5>
                <p className="card-text">{post.info}</p>
                {btnOpenFlag&&<button className="btn btn-primary" onClick={()=>{getMyComments()}}>View responds</button>}
                {btnCloseFlag&&<button className='btn btn-primary' onClick={toggleCommentFlag}>Close</button>}
                {/* {console.log({commentFlag,comments})} */}
                {commentFlag&&comments.map((comment, index) => {
                    return <CommentDisplay key={index} comment={comment}/>
                })}
                <input type="text" className='form-control' placeholder='type here...' ref={inputRef}></input>
                <button className="btn btn-primary" onClick={handleAddComment}>add comment</button>

            </div>
        </div>
    )
}
