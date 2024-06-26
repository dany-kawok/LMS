import { apiSlice } from "../../app/api/apiSlice";

export const usersSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: () => ({
        url: "/users",
      }),
      transformResponse: (response) => response.data, // Modify here to directly return data.data
    }), // Close the builder.mutation refreshAccessToken here
    getUserById: builder.query({
      query: (userId) => ({
        url: `/users/${userId}`,
      }),
      transformResponse: (response) => response.data, // Modify here to directly return data.data
    }),
    addCourseToUser: builder.mutation({
      query: (courseIds) => ({
        url: `/users/courses`,
        method: "POST",
        body: { courseIds },
      }),
      transformResponse: (response) => response.data,
    }),
  }), // Close the endpoints object here
});

export const {
  useGetAllUsersQuery,
  useGetUserByIdQuery,
  useAddCourseToUserMutation,
} = usersSlice;
