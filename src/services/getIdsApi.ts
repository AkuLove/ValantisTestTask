import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL, HASH_PASSWORD } from '../constants';
import { IGetIds, IGetIdsResponse } from '../types';

export const getIdsApi = createApi({
  reducerPath: 'getIdsApi',
  tagTypes: ['IDs'],
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (build) => ({
    getIds: build.mutation<IGetIdsResponse, IGetIds>({
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

export const { useGetIdsMutation } = getIdsApi;
