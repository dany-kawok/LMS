import { apiSlice } from "../../app/api/apiSlice";

export const categoriesSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllCategories: builder.query({
      query: () => ({
        url: "/categories",
      }),
      transformResponse: (response) => response.data, // Modify here to directly return data.data
    }), // Close the builder.mutation refreshAccessToken here
    getCategoryById: builder.query({
      query: (categoryId) => ({
        url: `/categories/${categoryId}`,
      }),
      transformResponse: (response) => response.data, // Modify here to directly return data.data
    }),
  }), // Close the endpoints object here
});

export const { useGetAllCategoriesQuery, useGetCategoryByIdQuery } =
  categoriesSlice;
