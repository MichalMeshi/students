import React, { useContext, useEffect, useState } from 'react'
import CourseContext from '../context/CourseContext';
import CourseCard from './CourseCard';

export default function CourseCardList() {
    const {courses,getCourses}=useContext(CourseContext);

    useEffect(()=>{
     getCourses();
      
    },[])
  return (
    <div>
{console.log(courses)}
        {courses?.map((course,index)=>{
           return <CourseCard course={course} key={index}/>
        })}
    </div>
  )
}
