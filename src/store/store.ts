import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { getIdsApi } from '../services/getIdsApi';
import { getItemsApi } from '../services/getItemsApi';
import { getFitlerApi } from '../services/getFilterApi';

const reducers = combineReducers({
  [getIdsApi.reducerPath]: getIdsApi.reducer,
  [getItemsApi.reducerPath]: getItemsApi.reducer,
  [getFitlerApi.reducerPath]: getFitlerApi.reducer,
});

export const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({}).concat(
      getIdsApi.middleware,
      getItemsApi.middleware,
      getFitlerApi.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
