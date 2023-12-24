import React, { useEffect } from 'react'

export default function CourseCard() {
    const getCourses=async()=>{
       const courses= await fetch('http://localhost:3000/courses')
       const res=await courses.json();
       console.log(res);
    }
   useEffect(()=>{
    getCourses();
   },[])
    
  return (
    <div>
        <h1>my course</h1>
    </div>
  )
}
