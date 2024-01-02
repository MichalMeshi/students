import React from 'react'
import { Routes, Route } from 'react-router-dom';
import SummariesList from './SummariesList';
import PostList from './PostList';

const CourseRoutes = ({ courseId, path }) => {
    return (
        <Routes>
            <Route path={`${path}/summeries`} element={<SummariesList courseId={courseId} />} />
            <Route path={`${path}/forum`} element={<PostList courseId={courseId} />} />
        </Routes>
    )
}

export default CourseRoutes