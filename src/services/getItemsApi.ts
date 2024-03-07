import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL, HASH_PASSWORD } from '../constants';
import { IGetItems, IGetItemsResponse } from '../types';

export const getItemsApi = createApi({
  reducerPath: 'getItemsApi',
  tagTypes: ['Items'],
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (build) => ({
    getItems: build.mutation<IGetItemsResponse, IGetItems>({
      query: (value) => ({
        url: '',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Auth': HASH_PASSWORD,
        },
        body: JSON.stringify(value),
      }),
    }),
  }),
});

export const { useGetItemsMutation } = getItemsApi;
