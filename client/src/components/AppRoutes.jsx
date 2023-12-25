import React from 'react'
import { Routes, Route } from 'react-router-dom';
import Home from '../pages';
import NoPage from './NoPage'
import Register from './Register';
import Login from './Login';
import CourseDatialPage from '../pages/CourseDatialPage';

const AppRoutes = () => {

    return (
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />
            <Route path='/courses/course_details' element={<CourseDatialPage/>}></Route> 

            <Route path='*' element={<NoPage />} />
        </Routes>
    )
}

export default AppRoutes;