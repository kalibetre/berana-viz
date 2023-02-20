import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import canvasReducer from './slices/canvasSlice';
import arrayReducer, { nodesAdapter } from './slices/nodesSlice';

export const store = configureStore({
    reducer: {
        array: arrayReducer,
        canvas: canvasReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const nodesSelectors = nodesAdapter.getSelectors(
    (state: RootState) => state.array
);

type DispatchFunc = () => AppDispatch;
export const useAppDispatch: DispatchFunc = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
