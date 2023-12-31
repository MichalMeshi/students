import { useParams } from "react-router-dom";
import AddSummary from "../components/AddSummary";
import PostList from "../components/PostList";
import SummariesList from "../components/SummariesList";

export default function CourseDatialPage() {
  const {courseId} = useParams();

  return (
    <div>
      <h1>Course Detail Page</h1>
      <AddSummary courseId={courseId}/>
      <SummariesList courseId={courseId}/>
      <PostList courseId={courseId}/>
    </div>
  );

}
