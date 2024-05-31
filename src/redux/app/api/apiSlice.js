import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

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
    console.log("sending refresh token");
    const refreshResult = await baseQuery("/auth/refresh", api, extraOptions);
    if (refreshResult?.data.data) {
      const { accessToken } = refreshResult.data.data.accessToken;
      Cookies.set("accessToekn", accessToken);
      result = baseQuery(args, api, extraOptions);
    } else {
      if (refreshResult?.error.status === 403) {
        console.log("Expired Credintials!");
      }
    }
    return refreshResult;
  }

  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
});

export default apiSlice.reducer;
