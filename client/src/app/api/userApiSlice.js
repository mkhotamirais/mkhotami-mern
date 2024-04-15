import { apiSlice } from "./apiSlice";

export const useApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => ({ url: `/api/user` }),
      transformResponse: (responseData) => responseData.data,
      providesTags: ["User"],
      keepUnusedDataFor: 5,
    }),
    getUserById: builder.query({
      query: (id) => ({ url: `/api/user/${id}` }),
      transformResponse: (responseData) => responseData.data,
      keepUnusedDataFor: 5,
    }),
    postUser: builder.mutation({
      query: (data) => ({ url: `/api/user`, method: "POST", body: data }),
    }),
    deleteUser: builder.mutation({
      query: (id) => ({ url: `/api/user/${id}`, method: "DELETE" }),
      invalidatesTags: ["User"],
    }),
    updateUser: builder.mutation({
      query: (data) => ({ url: `/api/user/${data.id}`, method: "PATCH", body: data }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const { useGetUsersQuery, useGetUserByIdQuery, usePostUserMutation, useUpdateUserMutation, useDeleteUserMutation } =
  useApiSlice;
