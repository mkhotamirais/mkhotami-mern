import { apiSlice } from "./apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    signup: builder.mutation({
      query: (data) => ({ url: `/api/auth`, method: "POST", body: data }),
    }),
    signin: builder.mutation({
      query: (data) => ({ url: `/api/auth`, method: "PATCH", body: data }),
    }),
    signout: builder.mutation({
      query: () => ({ url: `/api/auth`, method: "DELETE" }),
    }),
    getMe: builder.query({
      query: () => ({ url: `/api/auth/me` }),
      invalidatesTags: ["User"],
    }),
    updateMe: builder.mutation({
      query: (data) => ({ url: `/api/auth/me`, method: "PATCH", body: data }),
      providesTags: ["User"],
    }),
  }),
});

export const { useSignupMutation, useSigninMutation, useSignoutMutation, useGetMeQuery, useUpdateMeMutation } = authApiSlice;
