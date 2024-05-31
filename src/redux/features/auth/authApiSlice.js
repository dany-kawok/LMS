import { apiSlice } from "../../app/api/apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    registerAPI: builder.mutation({
      query: (credentials) => ({
        url: "/auth/register",
        method: "POST",
        body: { ...credentials },
      }),
    }), // Close the builder.mutation registerAPI here
    loginAPI: builder.mutation({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: { ...credentials },
      }),
    }), // Close the builder.mutation loginAPI here
    refreshAccessToken: builder.mutation({
      query: () => ({
        url: "/auth/refresh",
      }),
    }), // Close the builder.mutation refreshAccessToken here
    logoutAPI: builder.mutation({
      query: () => ({
        url: "/auth/logout",
      }),
    }), // Close the builder.mutation refreshAccessToken here
  }), // Close the endpoints object here
});

export const { useRegisterAPIMutation, useLoginAPIMutation } = authApiSlice;
