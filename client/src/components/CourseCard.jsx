import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import CourseDatialPage from '../pages/CourseDatialPage';

export default function CourseCard(props) {
    const {course}=props;
  
    
  return (
    <div className="card" style={{width: "18rem"}}>
  <div className="card-body">
    <h5 className="card-title">{course.name}</h5>
    <h6 className="card-subtitle mb-2 text-body-secondary">{course.field}</h6>
    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    <Link className="card-link" to='/courses/course_details'>read more</Link>
  </div>
</div>
  )
}
