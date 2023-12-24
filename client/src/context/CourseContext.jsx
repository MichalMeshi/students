import React, { createContext, useState } from "react";

const CourseContext = createContext({});

const CourseContextProvider = ({ children }) => {
    const [courses, setcourses] = useState([])


    const getCourses=async()=>{
       const res= await fetch('http://localhost:3000/courses')
       
       const temp=await res.json()
      setcourses(temp);
    }
    

    const shared = {courses,getCourses}
    return (
        <CourseContext.Provider value={shared}>
            {children}
        </CourseContext.Provider>
    );
}

export {CourseContextProvider }
export default CourseContext

