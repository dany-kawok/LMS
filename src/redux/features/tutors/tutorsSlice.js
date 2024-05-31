import { apiSlice } from "../../app/api/apiSlice";

export const tutorsSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllTutors: builder.query({
      query: () => ({
        url: "/tutors",
      }),
      transformResponse: (response) => response.data, // Modify here to directly return data.data
    }), // Close the builder.mutation refreshAccessToken here
    getTutorById: builder.query({
      query: (tutorId) => ({
        url: `/tutors/${tutorId}`,
      }),
      transformResponse: (response) => response.data, // Modify here to directly return data.data
    }),
  }), // Close the endpoints object here
});

export const { useGetAllTutorsQuery, useGetTutorByIdQuery } = tutorsSlice;
