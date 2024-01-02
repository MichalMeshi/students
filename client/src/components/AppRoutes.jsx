import React from 'react'
import { Routes, Route } from 'react-router-dom';
import Home from '../pages';
import NoPage from './NoPage'
import Register from './Register';
import Login from './Login';
import CourseDatialPage from '../pages/CourseDatialPage';
import CourseCardList from './CourseCardList';
import Logout from './Logout';
import Tutoring from './Tutoring';
import ResetPassword from './ResetPassword';
import PostList from './PostList';
import CodeVerification from './CodeVerification'
import SummariesList from './SummariesList';
import SharedLearning from './SharedLearning';
const AppRoutes = () => {
    return (
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/course_details/:courseId' element={<CourseDatialPage />} />
            <Route path={`/course_details/:courseId/summeries`} element={<SummariesList />} />
            <Route path={`/course_details/:courseId/forum`} element={<PostList />} />
            <Route path={`/course_details/:courseId/sharedLearning`} element={<SharedLearning />} />
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />
            <Route path='/logout' element={<Logout />} />
            <Route path='/reset-password/:resetToken' element={<ResetPassword />} />
            <Route path='/courses-list' element={<CourseCardList />} />
            <Route path='/tutoring' element={<Tutoring />} />
            {/* <Route path='/forum' element={<PostList />} /> */}
            <Route path='*' element={<NoPage />} />
        </Routes>
    )
}

export default AppRoutes;