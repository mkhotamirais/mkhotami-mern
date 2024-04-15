import { apiSlice } from "./apiSlice";

export const productApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => `/api/product`,
      transformResponse: (responseData) => responseData.data,
      providesTags: ["Product"],
    }),
    getProductById: builder.query({
      query: (id) => `/api/product/${id}`,
      transformResponse: (responseData) => responseData.data,
      providesTags: ["Product"],
    }),
    postProduct: builder.mutation({
      query: (data) => ({ url: `/api/product`, method: "POST", body: data }),
      invalidatesTags: (result, error, arg) => [{ type: "Product", id: arg.id }],
    }),
    updateProduct: builder.mutation({
      query: (data) => ({ url: `/api/product/${data?.id}`, method: "PATCH", body: data }),
      invalidatesTags: ["Product"],
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({ url: `/api/product/${id}`, method: "DELETE" }),
      invalidatesTags: ["Product"],
    }),
  }),
});

export const {
  useGetProductByIdQuery,
  useGetProductsQuery,
  usePostProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productApiSlice;
