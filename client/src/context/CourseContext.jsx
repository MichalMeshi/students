import React, { createContext, useEffect, useState } from "react";

const CourseContext = createContext({});

const CourseContextProvider = ({ children }) => {
    const [courses, setcourses] = useState([])
    const [myCourses, setMyCourses] = useState([]);

    const handleFavoriteCourse = async (course) => {
        try {
            const res = await fetch(`http://localhost:3000/courses/add-favorite-course/${course._id}`, {
                method: 'POST',
                headers: {
                    "authorization": localStorage.getItem("token")
                }
            })
            const temp = await res.json();

            if (temp) {
                setMyCourses([...myCourses, course])
                console.log(temp.msg);
            }


        } catch (error) {
            console.log(error.message);
        }
    }
    const handleUnFavoriteCourse = async (course) => {

        try {
            const res = await fetch(`http://localhost:3000/courses/remove-favorite-course/${course._id}`, {
                method: 'DELETE',
                headers: {
                    "authorization": localStorage.getItem("token")
                }
            })
            const temp = await res.json();
            if (temp) {
                console.log(temp.msg);
                const updatedMyCourses = myCourses.filter(item => item._id !== course._id)
                setMyCourses([...updatedMyCourses]);

            }
        } catch (error) {
            console.log(error.message);
        }
    }
    const getCourses = async () => {
        const res = await fetch('http://localhost:3000/courses')
        const temp = await res.json()
        setcourses([...temp]);
    }


    const shared = { courses, getCourses, setMyCourses, myCourses, handleFavoriteCourse, handleUnFavoriteCourse }
    return (
        <CourseContext.Provider value={shared}>
            {children}
        </CourseContext.Provider>
    );
}

export { CourseContextProvider }
export default CourseContext

