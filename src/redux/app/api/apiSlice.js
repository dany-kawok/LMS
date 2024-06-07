import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";
import { authApiSlice } from "../../features/auth/authApiSlice"; // Import authApiSlice to access the logoutAPI

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_BASE_URL,
  credentials: "include",
  prepareHeaders: (headers) => {
    const token = Cookies.get("accessToken");
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result?.error?.status === 403) {
    // Try to refresh the access token
    const refreshResult = await baseQuery("/auth/refresh", api, extraOptions);
    if (refreshResult?.data?.data) {
      // Successfully got a new access token
      console.log("refresh exist:: ", refreshResult.data.data.accessToken);
      Cookies.set("accessToken", refreshResult.data.data.accessToken);
      // Retry the original query with the new access token
      result = await baseQuery(args, api, extraOptions);
    } else {
      // Failed to refresh the access token
      if (refreshResult?.error?.status === 403) {
        console.log("Expired Credentials!");

        // Remove the accessToken cookie
        Cookies.remove("accessToken");

        // Initiate the logout API call
        const { logoutAPI } = authApiSlice.endpoints;
        await api.dispatch(logoutAPI.initiate());

        // Return the refresh result error
        return refreshResult;
      }
    }
  }

  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
});

export default apiSlice.reducer;
