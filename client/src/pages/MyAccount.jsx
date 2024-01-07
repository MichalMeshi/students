import React from 'react'
import Profile from '../components/Profile'
import CourseCardList from '../components/CourseCardList'
import MyCourses from '../components/MyCourses'
import MainNavbar from '../components/MainNavbar'
import '../stylesheets/myAccount.css'
import MyForums from '../components/MyForums'
import MySummaries from '../components/MySummaries'
import Footer from '../components/Footer'
// import profileBg from '../images/profile-bg.jpg';
const MyAccount = () => {


  return (
    <>
      <MainNavbar />
      <div className='pb-5 mb-5'>
        <div className='container-fluid'>
          <div id='profile-strip' className='container'>
            <Profile />
          </div>
        </div>
      </div>
      <MyCourses />
      <MyForums />
      <MySummaries />
      <Footer />
    </>
  )
}

export default MyAccount