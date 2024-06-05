// src/redux/features/courses/coursesSlice.js
import { apiSlice } from "../../app/api/apiSlice";

export const coursesSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllCourses: builder.query({
      query: () => ({
        url: "/courses",
      }),
      transformResponse: (response) => response.data,
    }),
    getCoursesByCategory: builder.query({
      query: (categoryId) => ({
        url: `/categories/${categoryId}/courses`,
      }),
      transformResponse: (response) => response.data,
    }),
    getCoursesCollection: builder.query({
      query: (courseIds) => ({
        url: `/courses/ids`,
        method: "POST",
        body: { courseIds },
      }),
      transformResponse: (response) => response.data,
    }),

    getCoursesOfTheUser: builder.query({
      query: () => ({
        url: `/users/courses`,
      }),
      transformResponse: (response) => {
        const courses = response.data.courses;
        // Ensure the response is always an array
        return Array.isArray(courses) ? courses : [courses];
      },
    }),
    searchCourse: builder.query({
      query: (searchText) => ({
        url: `/courses/search/${searchText}`,
      }),
      transformResponse: (response) => response.data,
    }),
  }),
});

export const {
  useGetAllCoursesQuery,
  useGetCoursesByCategoryQuery,
  useGetCoursesOfTheUserQuery,
  useSearchCourseQuery,
  useGetCoursesCollectionQuery,
} = coursesSlice;

export default coursesSlice.reducer;
