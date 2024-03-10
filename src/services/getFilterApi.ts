import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL, HASH_PASSWORD } from '../constants';
import { IGetFilter, IGetFilterResponse } from '../types';

export const getFitlerApi = createApi({
  reducerPath: 'getFilterApi',
  tagTypes: ['Filter'],
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (build) => ({
    getFilter: build.mutation<IGetFilterResponse, IGetFilter>({
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

export const { useGetFilterMutation } = getFitlerApi;
