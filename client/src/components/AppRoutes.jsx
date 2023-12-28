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
import VerifyToken from './VerifyToken';

const AppRoutes = () => {

    return (
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />
            <Route path='/logout' element={<Logout />} />
            <Route path='/reset-password/:resetToken' element={<ResetPassword />} />
            <Route path='/courses/course_details' element={<CourseDatialPage />} />
            <Route path='/courses-list' element={<CourseCardList />} />
            <Route path='/tutoring' element={<Tutoring />} />
            <Route path='/verify' element={<VerifyToken />} />

            <Route path='*' element={<NoPage />} />
        </Routes>
    )
}

export default AppRoutes;