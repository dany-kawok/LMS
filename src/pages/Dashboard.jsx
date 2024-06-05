import {
  useGetCoursesOfTheUserQuery,
  useGetCoursesCollectionQuery,
} from "../redux/features/courses/coursesSlice";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const { data: userCoursesIds = [] } = useGetCoursesOfTheUserQuery();
  console.log(userCoursesIds);
  const {
    data: userCourses = [],
    isLoading,
    isError,
  } = useGetCoursesCollectionQuery(userCoursesIds);
  console.log(userCourses);
  if (isLoading) {
    return (
      <DashboardContainer>
        <h1>Dashboard</h1>
        <CourseList>
          {Array.from({ length: 8 }).map((_, index) => (
            <SkeletonCourseCard key={index}>
              <SkeletonCourseImage />
              <SkeletonCourseName />
            </SkeletonCourseCard>
          ))}
        </CourseList>
      </DashboardContainer>
    );
  }

  if (isError) return <p>Error loading user courses</p>;

  return (
    <DashboardContainer>
      <h1>Dashboard</h1>
      <CourseList>
        {userCourses.map((course) => (
          <CourseCard key={course._id}>
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
    </DashboardContainer>
  );
};

export default Dashboard;

const DashboardContainer = styled.div`
  padding: 20px;
`;

const CourseList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  margin-top: 20px;
`;

const CourseCard = styled.div`
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
  width: 70%;
  height: 70%;
  object-fit: cover;
`;

const CourseName = styled.h2`
  margin: 10px 0;
  font-size: 1.2rem;
  color: #fff;
`;

// Skeleton components
const SkeletonCourseCard = styled.div`
  background-color: #333;
  border-radius: 10px;
  overflow: hidden;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const SkeletonCourseImage = styled.div`
  width: 100%;
  height: 150px;
  background-color: #444;
  margin-bottom: 10px;
`;

const SkeletonCourseName = styled.div`
  width: 80%;
  height: 20px;
  background-color: #444;
  margin-top: 10px;
`;
