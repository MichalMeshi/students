import React from 'react'
import Profile from '../components/Profile'
import CourseCardList from '../components/CourseCardList'
import MyCourses from '../components/MyCourses'
const MyAccount = () => {
  return (
    <div className='container'>
      <Profile />
      <MyCourses />
      {/* <CourseCardList /> */}
    </div>
  )
}

export default MyAccount