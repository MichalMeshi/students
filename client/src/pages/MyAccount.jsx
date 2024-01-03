import React from 'react'
import Profile from '../components/Profile'
import CourseCardList from '../components/CourseCardList'
import MyCourses from '../components/MyCourses'
import Navbar from '../components/Navbar'
import '../stylesheets/myAccount.css'
const MyAccount = () => {


  return (
    <>
      <Navbar />
      <div className='container-fluid'>
        <div id='profile-strip' className='container'>
          <Profile />
        </div>
        </div>
        <MyCourses />
      
    </>
  )
}

export default MyAccount