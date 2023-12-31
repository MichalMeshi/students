import React, { useContext, useEffect, useRef } from 'react'
import ForumContext from '../context/ForumContext'
import Post from './Post';

export default function PostList(props) {
    const {posts,getPosts}=useContext(ForumContext);
    const {courseId}=props;
    useEffect(()=>{
        getPosts(courseId);
        console.log({posts});
    },[])
  return (
    <div >
{
   
    posts?.map((item,index)=>{
       return <Post key={index} post={item}/>
       
    })
}
    </div>
  )
}
