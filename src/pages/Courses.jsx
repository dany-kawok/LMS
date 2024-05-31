import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useGetCoursesByCategoryQuery } from "../redux/features/courses/coursesSlice";
import styled from "styled-components"; // Using styled-components for styling

const Courses = () => {
  const location = useLocation();
  const { categoryId, title } = location.state || {};

  const {
    data: courses,
    isLoading,
    isError,
  } = useGetCoursesByCategoryQuery(categoryId);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading courses</p>;

  return (
    <CoursesContainer>
      {categoryId && title ? (
        <>
          <CourseTitle>{title}</CourseTitle>
          <CourseList>
            {courses.map((course) => (
              <CourseCard key={course.id}>
                <Link
                  to={{ pathname: "/singleCourse" }}
                  state={{ course }}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <CourseImage src={course.image} alt={course.title} />
                  <CourseName>{course.title}</CourseName>
                </Link>
              </CourseCard>
            ))}
          </CourseList>
        </>
      ) : (
        <p>No course data available</p>
      )}
    </CoursesContainer>
  );
};

export default Courses;

const CoursesContainer = styled.div`
  padding: 20px;
`;

const CourseTitle = styled.h1`
  text-align: center;
  margin-bottom: 20px;
`;

const CourseList = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 30px;
`;

const CourseCard = styled.div`
  width: 250px;
  height: 250px;

  background-color: #282828;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  transition: transform 0.2s;
  &:hover {
    transform: scale(1.05);
  }
`;

const CourseImage = styled.img`
  width: 100%;
  height: 150px;
  object-fit: cover;
`;

const CourseName = styled.h2`
  margin: 10px 0;
  font-size: 1.2rem;
  color: #fff;
`;