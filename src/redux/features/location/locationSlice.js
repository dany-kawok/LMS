import { apiSlice } from "../../app/api/apiSlice";

export const locationAndTimingApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getLocation: builder.query({
      query: () => ({
        url: "/geolocation",
        query: () => "json/",
      }),
    }), // Close the builder.mutation getLocation here
  }), // Close the endpoints object here
});

export const { useGetLocationQuery, useUpdateTimeQuery } = locationAndTimingApi;
