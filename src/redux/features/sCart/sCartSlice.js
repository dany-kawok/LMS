import { apiSlice } from "../../app/api/apiSlice";
import { setCartLength } from "./sCartDetails";
import { setUserCourses } from "../users/userCoursesSlice";

export const sCartSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUserCart: builder.query({
      query: () => "/scart",
      transformResponse: (response) => response.data,
      providesTags: ["Cart"],
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          dispatch(setCartLength(data.length));
        } catch (error) {
          console.error("Error fetching cart:", error);
        }
      },
    }),
    addToCart: builder.mutation({
      query: (courseId) => ({
        url: "/scart",
        method: "POST",
        body: { courseId },
      }),
      transformResponse: (response) => response.data,
      invalidatesTags: ["Cart"],
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          dispatch(setCartLength(data.length));
          const userCoursesResponse = await dispatch(
            apiSlice.endpoints.getCoursesOfTheUser.initiate()
          ).unwrap();
          dispatch(setUserCourses(userCoursesResponse));
        } catch (error) {
          console.error("Error adding to cart:", error);
        }
      },
    }),
    removeFromCart: builder.mutation({
      query: (courseId) => ({
        url: `/scart`,
        method: "DELETE",
        body: { courseId },
      }),
      transformResponse: (response) => response.data,
      invalidatesTags: ["Cart"],
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          dispatch(setCartLength(data.length));
          const userCoursesResponse = await dispatch(
            apiSlice.endpoints.getCoursesOfTheUser.initiate()
          ).unwrap();
          dispatch(setUserCourses(userCoursesResponse));
        } catch (error) {
          console.error("Error removing from cart:", error);
        }
      },
    }),
    clearCart: builder.mutation({
      query: () => ({
        url: "/scart/clear",
        method: "DELETE",
      }),
      transformResponse: (response) => response.data,
      invalidatesTags: ["Cart"],
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          dispatch(setCartLength(data.length));
          const userCoursesResponse = await dispatch(
            apiSlice.endpoints.getCoursesOfTheUser.initiate()
          ).unwrap();
          dispatch(setUserCourses(userCoursesResponse));
        } catch (error) {
          console.error("Error clearing cart:", error);
        }
      },
    }),
  }),
});

export const {
  useGetUserCartQuery,
  useAddToCartMutation,
  useRemoveFromCartMutation,
  useClearCartMutation,
} = sCartSlice;

export default sCartSlice.reducer;
