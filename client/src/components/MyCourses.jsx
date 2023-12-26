import React, { useContext, useEffect, useState } from 'react'
import CourseCard from './CourseCard';
import CourseContext from '../context/CourseContext';

const MyCourses = () => {
    // const [favorite, setFavorite] = useState(true);
    const { setMyCourses, myCourses } = useContext(CourseContext)

    const getMyCourses = async () => {
        try {
            const res = await fetch('http://localhost:3000/courses/my-courses', {
                headers: {
                    "authorization": localStorage.getItem("token")
                }
            })
            const temp = await res.json();
            if (Array.isArray(temp))
                setMyCourses([...temp]);
        } catch (error) {
            console.log(error.message);
        }
    }

    useEffect(() => {
        getMyCourses();
    }, [])

    return (
        <div>
            <h1>My Courses</h1>
            {myCourses?.map((myCourse, index) => {
                return <CourseCard
                    course={myCourse}
                    key={index}
                />
            })}
        </div>)
}

export default MyCourses