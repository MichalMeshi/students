import React from 'react'
import { Link } from 'react-router-dom'

export default function Sidebar({ courseId }) {

  return (
    <nav>
      <Link to={`/course_details/${courseId}/summeries`}>Summeries </Link>
      <Link to={`/course_details/${courseId}/forum`}>Forum </Link>
      <Link to={`/course_details/${courseId}/sharedLearning`}>Shared Learning </Link>
    </nav>
  )
}
