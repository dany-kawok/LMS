import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSearchCourseQuery } from "../redux/features/courses/coursesSlice";
import "./css/searchCourse.css";

function CoursesSearchResults() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchText = searchParams.get("search");
  const [categories, setCategories] = useState([]);
  const [tutors, setTutors] = useState([]);

  const {
    data: searchResults,
    isLoading,
    isError,
    error,
  } = useSearchCourseQuery(searchText);

  useEffect(() => {
    if (searchResults) {
      const categorySet = new Set();
      const tutorSet = new Set();
      searchResults.forEach((course) => {
        categorySet.add(course.category.name); // Push category name instead of ID
        course.tutors.forEach((tutor) => tutorSet.add(tutor)); // Push tutor name instead of ID
      });
      setCategories(Array.from(categorySet));
      setTutors(Array.from(tutorSet));
    }
  }, [searchResults]);

  return (
    <div className="search-results-container">
      <div className="sidebar">
        {categories.length > 0 && (
          <div className="filter-section by-category-section">
            <h3>Filter by Category</h3>
            <div className="checkbox-group">
              {categories.map((category) => (
                <p key={category} style={{ padding: "10px" }}>
                  <input type="checkbox" value={category} />
                  {category}
                </p>
              ))}
            </div>
          </div>
        )}
        {tutors.length > 0 && (
          <div className="filter-section by-tutor-section">
            <h3>Filter by Tutor</h3>
            <div className="checkbox-group">
              {tutors.map((tutor) => (
                <p key={tutor} style={{ padding: "10px" }}>
                  <input type="checkbox" value={tutor} />
                  {tutor}
                </p>
              ))}
            </div>
          </div>
        )}
      </div>
      <div className="course-list-container">
        {isLoading && <div>Loading...</div>}
        {isError && <div>Error: {error}</div>}
        {searchResults && (
          <div className="course-list" style={{ userSelect: "none" }}>
            {searchResults.map((course) => (
              <Link
                key={course._id}
                to={{ pathname: "/singleCourse" }}
                state={{ course }}
                className="course-list-item"
              >
                <CourseListItem course={course} />
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function CourseListItem({ course }) {
  return (
    <div>
      <div className="search-course-details">
        <img
          src={course.image}
          alt={course.title}
          className="search-course-image"
        />
        <div>
          <h3>{course.title}</h3>
          <p>{course.description}</p>
        </div>
      </div>
    </div>
  );
}

export default CoursesSearchResults;
