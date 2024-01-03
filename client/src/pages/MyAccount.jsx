import React from 'react'
import Profile from '../components/Profile'
import CourseCardList from '../components/CourseCardList'
import MyCourses from '../components/MyCourses'
import Navbar from '../components/Navbar'
const MyAccount = () => {
  return (
    <div className='container'>
      <Navbar />
      <Profile />
      <MyCourses />
    </div>
  )
}

export default MyAccount