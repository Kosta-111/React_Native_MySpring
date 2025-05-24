import { createApi } from '@reduxjs/toolkit/query/react';
import { createBaseQuery } from '@/utils/createBaseQuery';
import { serialize } from "object-to-formdata";
import {IDishCreateRequest, IDishEditRequest, IDishIdResponse, IDishItem} from "@/interfaces/dish";

export const dishesApi = createApi( {
    reducerPath: 'dishesApi',
    baseQuery: createBaseQuery('dishes'),
    tagTypes: ['Dishes'],

    endpoints: (builder) => ( {
        getDishes: builder.query<IDishItem[], number>( {
            query: (categoryId) => {
                return {
                    url: `getList/${categoryId}`,
                    method: 'GET'
                }
            },
            providesTags: ['Dishes']
        }),

        getDish: builder.query<IDishItem, number>( {
            query: (id) => {
                return {
                    url: `getDish/${id}`,
                    method: 'GET'
                }
            },
            providesTags: ['Dishes']
        }),

        createDish: builder.mutation<IDishIdResponse, IDishCreateRequest>( {
            query: ({ images, ...model }) => {
                const formData = serialize(model);
                images.forEach((img) => {
                    formData.append('images', img);
                })
                return {
                    url: 'create',
                    method: 'POST',
                    body: formData
                }
            },
            invalidatesTags: ['Dishes']
        }),

        updateDish: builder.mutation<IDishIdResponse, IDishEditRequest>( {
            query: ({ images, ...model }) => {
                const formData = serialize(model);
                images.forEach((img) => {
                    formData.append('images', img);
                })
                return {
                    url: 'edit',
                    method: 'PUT',
                    body: formData
                }
            },
            invalidatesTags: ['Dishes']
        }),

        deleteDish: builder.mutation<void, number>( {
            query: (id) => {
                return {
                    url: `remove/${id}`,
                    method: 'DELETE'
                }
            },
            invalidatesTags: ['Dishes']
        }),
    })
})

export const {
    useGetDishesQuery,
    useGetDishQuery,
    useCreateDishMutation,
    useUpdateDishMutation,
    useDeleteDishMutation
} = dishesApi;