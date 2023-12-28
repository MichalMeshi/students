import React, { useContext, useEffect, useRef } from 'react'
import ForumContext from '../context/ForumContext'
import Post from './Post';

export default function PostList() {
    const {posts,getPosts}=useContext(ForumContext);
    useEffect(()=>{
        getPosts();
    },[])
  return (
    <div >
{
   
    posts.map((item,index)=>{
       return <Post key={index} post={item}/>
       
    })
}
    </div>
  )
}
