import { useParams } from "react-router-dom";
import AddSummary from "../components/AddSummary";
import PostList from "../components/PostList";
import SummariesList from "../components/SummariesList";
import Sidebar from "../components/Sidebar";


export default function CourseDatialPage() {
  const {courseId} = useParams();

  return (
    <div>
      <h1>Course {courseId} Detail Page</h1>
      <Sidebar courseId={courseId}/>
      <AddSummary courseId={courseId}/>
      <SummariesList courseId={courseId}/>
      <PostList courseId={courseId}/>
    </div>
  );

}
