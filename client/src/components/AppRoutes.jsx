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
import CourseListPage from '../pages/CourseListPage';
import MyAccount from '../pages/MyAccount';
import Contact from './Contact';

const AppRoutes = () => {
    return (
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/personalArea' element={<MyAccount />} />
            <Route path='/course_details/:courseId/:courseName' element={<CourseDatialPage />} />
            <Route path={`/course_details/:courseId/:courseName/summeries`} element={<SummariesList />} />
            <Route path={`/course_details/:courseId/:courseName/forum`} element={<PostList />} />
            <Route path={`/course_details/:courseId/:courseName/sharedLearning`} element={<SharedLearning />} />
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />
            <Route path='/logout' element={<Logout />} />
            <Route path='/reset-password/:resetToken' element={<ResetPassword />} />
            <Route path='/courses-list' element={<CourseListPage />} />
            <Route path='/verify' element={<CodeVerification />} />
            <Route path='/tutoring' element={<Tutoring />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='*' element={<NoPage />} />
        </Routes>
    )
}

export default AppRoutes;