import React, { useContext, useEffect, useRef } from 'react'
import ForumContext from '../context/ForumContext'
import Post from './Post';
import { useParams } from 'react-router-dom';

export default function PostList() {
  const { posts, getPosts } = useContext(ForumContext);
  const { courseId } = useParams();
  useEffect(() => {
    getPosts(courseId);
    console.log({ posts });
  }, [])
  return (
    <div >
      {

        posts?.map((item, index) => {
          return <Post key={index} post={item} />

        })
      }
    </div>
  )
}
