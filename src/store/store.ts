import { configureStore } from '@reduxjs/toolkit';
import arrayReducer, { arrayAdapter } from './slices/arraySlice';

export const store = configureStore({
    reducer: {
        array: arrayReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const arraySelectors = arrayAdapter.getSelectors(
    (state: RootState) => state.array
);
