import { useLocation } from "react-router-dom";
import "./css/SingleCourse.css"; // Import the CSS file

const SingleCourse = () => {
  const location = useLocation();
  const course = location.state?.course;

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <span key={`full-${i}`} className="star full-star">
          ★
        </span>
      );
    }
    if (halfStar) {
      stars.push(
        <span key="half" className="star half-star">
          ★
        </span>
      );
    }
    for (let i = stars.length; i < 5; i++) {
      stars.push(
        <span key={`empty-${i}`} className="star empty-star">
          ☆
        </span>
      );
    }

    return stars;
  };

  return (
    <div className="course-container">
      {course ? (
        <div className="course-content">
          <img className="course-image" src={course.image} alt={course.title} />
          <div className="course-details">
            <h1 className="course-title">{course.title}</h1>
            <p>{course.description}</p>
            <div className="course-extra-details">
              <p className="course-price">Price: ${course.price}</p>
              <div className="course-rating">
                <span>Rating: </span>
                {renderStars(course.rating)}
                <span className="rating-label"> ({course.rating})</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p>No course data available</p>
      )}
    </div>
  );
};

export default SingleCourse;
