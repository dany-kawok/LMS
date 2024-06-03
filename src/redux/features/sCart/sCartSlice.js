import { apiSlice } from "../../app/api/apiSlice";

export const sCartSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUserCart: builder.query({
      query: () => "/scart",
      transformResponse: (response) => response.data, // Modify here to directly return data.data,
    }),

    addToCart: builder.mutation({
      query: (courseId) => ({
        url: "/scart",
        method: "POST",
        body: { courseId },
      }),
      transformResponse: (response) => response.data, // Modify here to directly return data.data
    }),
    removeFromCart: builder.mutation({
      query: (courseId) => ({
        url: `/scart`,
        method: "DELETE",
        body: { courseId },
      }),
      transformResponse: (response) => response.data, // Modify here to directly return data.data
    }),
    clearCart: builder.mutation({
      query: () => ({
        url: "/scart/clear",
        method: "DELETE",
      }),
      transformResponse: (response) => response.data, // Modify here to directly return data.data
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
