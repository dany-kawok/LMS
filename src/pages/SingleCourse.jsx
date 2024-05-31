import { useLocation } from "react-router-dom";
import "./css/SingleCourse.css"; // Import the CSS file

const SingleCourse = () => {
  const location = useLocation();
  const course = location.state?.course;

  return (
    <div className="course-container">
      {course ? (
        <div className="course-content">
          <img className="course-image" src={course.image} alt={course.title} />
          <div className="course-details">
            <h1 className="course-title">{course.title}</h1>
            <p>{course.description}</p>
            {/* Add more course details here */}
          </div>
        </div>
      ) : (
        <p>No course data available</p>
      )}
    </div>
  );
};

export default SingleCourse;
