import { apiSlice } from "../../app/api/apiSlice";

export const coursesSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllCourses: builder.query({
      query: () => ({
        url: "/courses",
      }),
      transformResponse: (response) => response.data, // Modify here to directly return data.data
    }),
    getCoursesByCategory: builder.query({
      query: (categoryId) => ({
        url: `/categories/${categoryId}/courses`,
      }),
      transformResponse: (response) => response.data, // Modify here to directly return data.data
    }),
    searchCourse: builder.query({
      query: (searchText) => ({
        url: `/courses/search/${searchText}`,
      }),
      transformResponse: (response) => response.data, // Modify here to directly return data.data
    }),
  }),
});

export const {
  useGetAllCoursesQuery,
  useGetCoursesByCategoryQuery,
  useSearchCourseQuery,
} = coursesSlice;
