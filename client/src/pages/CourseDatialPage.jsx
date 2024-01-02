import { BrowserRouter, useMatch, useParams } from "react-router-dom";
import AddSummary from "../components/AddSummary";
import PostList from "../components/PostList";
import SummariesList from "../components/SummariesList";
import Sidebar from "../components/Sidebar";
import CourseRoutes from "../components/CourseRoutes";


export default function CourseDatialPage() {
  const { courseId } = useParams();
  return (
    <div>
      <h1>Course {courseId} Detail Page</h1>
      <Sidebar courseId={courseId}/>
      {/* <CourseRoutes courseId={courseId} path={path} /> */}

    </div>
  );

}
