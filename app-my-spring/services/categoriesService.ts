import { createApi } from '@reduxjs/toolkit/query/react';
import { createBaseQuery } from '@/utils/createBaseQuery';
import { ICategoryCreateRequest, ICategoryEditRequest, ICategoryIdResponse, ICategoryItem } from "@/interfaces/category";
import { serialize } from "object-to-formdata";

export const categoriesApi = createApi( {
    reducerPath: 'categoriesApi',
    baseQuery: createBaseQuery('categories'),
    tagTypes: ['Categories'],

    endpoints: (builder) => ( {
        getCategories: builder.query<ICategoryItem[], void>( {
            query: () => {
                return {
                    url: '',
                    method: 'GET'
                }
            },
            providesTags: ['Categories']
        }),

        getCategory: builder.query<ICategoryItem, number>( {
            query: (id) => {
                return {
                    url: `${id}`,
                    method: 'GET'
                }
            },
            providesTags: ['Categories']
        }),

        createCategory: builder.mutation<ICategoryIdResponse, ICategoryCreateRequest>( {
            query: (model) => {
                const formData = serialize(model);
                return {
                    url: '',
                    method: 'POST',
                    body: formData
                }
            },
            invalidatesTags: ['Categories']
        }),

        updateCategory: builder.mutation<ICategoryIdResponse, ICategoryEditRequest>( {
            query: (model) => {
                const formData = serialize(model);
                return {
                    url: '',
                    method: 'PUT',
                    body: formData
                }
            },
            invalidatesTags: ['Categories']
        }),

        deleteCategory: builder.mutation<void, number>( {
            query: (id) => {
                return {
                    url: `${id}`,
                    method: 'DELETE'
                }
            },
            invalidatesTags: ['Categories']
        }),
    })
})

export const {
    useGetCategoriesQuery,
    useGetCategoryQuery,
    useCreateCategoryMutation,
    useUpdateCategoryMutation,
    useDeleteCategoryMutation
} = categoriesApi;