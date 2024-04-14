import { apiSlice } from "./apiSlice";

export const productCategoryApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: () => `/api/category`,
      transformResponse: (responseData) => {
        return responseData.data;
      },
      providesTags: ["Category"],
    }),
    postCategory: builder.mutation({
      query: (data) => ({ url: "/api/category", method: "POST", body: data }),
      invalidatesTags: (result, error, arg) => [{ type: "Category", id: arg.id }],
    }),
    updateCategory: builder.mutation({
      query: (data) => ({ url: `/api/category/${data.id}`, method: "PATCH", body: data }),
      // invalidatesTags: (result, error, arg) => [{ type: "Category", id: arg.id }],
      invalidatesTags: ["Category"],
    }),
    deleteCategory: builder.mutation({
      query: (id) => ({ url: `/api/category/${id}`, method: "DELETE" }),
      invalidatesTags: ["Category"],
    }),
  }),
});

export const { useGetCategoriesQuery, usePostCategoryMutation, useUpdateCategoryMutation, useDeleteCategoryMutation } =
  productCategoryApiSlice;
