import { Link } from "react-router-dom";
import styled from "styled-components";
import { useGetAllCoursesQuery } from "../redux/features/courses/coursesSlice";

const AllCourses = () => {
  const { data: allCourses = [], isLoading, isError } = useGetAllCoursesQuery();

  if (isLoading) {
    return <LoadingMessage>Loading...</LoadingMessage>;
  }

  if (isError) {
    return <ErrorMessage>Error loading courses</ErrorMessage>;
  }

  return (
    <CoursesContainer>
      {allCourses.map((course) => (
        <CourseCard key={course.id}>
          <Link
            to={`/singleCourse/${course.id}`}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <CourseImage src={course.image} alt={course.title} />
            <CourseTitle>{course.title}</CourseTitle>
          </Link>
        </CourseCard>
      ))}
    </CoursesContainer>
  );
};

const CoursesContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  padding: 20px;
`;

const CourseCard = styled.div`
  background-color: #555;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
  text-align: center;

  &:hover {
    transform: scale(1.05);
  }
`;

const CourseImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const CourseTitle = styled.div`
  padding: 10px;
`;

const LoadingMessage = styled.p`
  text-align: center;
`;

const ErrorMessage = styled.p`
  text-align: center;
  color: red;
`;

export default AllCourses;
