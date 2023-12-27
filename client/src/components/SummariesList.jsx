import React from 'react'

export default function SummariesList() {
  return (
    <div>
        <div className="card p-3 container">
        <h2>Summaries List:</h2>

        </div>
       </div>
  )
}


// export default function CourseCardList() {
//   const { courses, getCourses } = useContext(CourseContext);

//   useEffect(() => {
//     getCourses();

//   }, [])
//   return (
//     <div>
//       <h1>Courses List</h1>
//       {console.log(courses)}
//       {courses?.map((course, index) => {
//         return <CourseCard course={course} key={index} />
//       })}
//     </div>
//   )
// }
