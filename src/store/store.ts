import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { beranavizApi } from '../services/beranavizApi';
import canvasReducer from './slices/canvasSlice';
import documentReducer from './slices/documentSlice';
import arrayReducer, { nodesAdapter } from './slices/nodesSlice';

export const store = configureStore({
    reducer: {
        nodes: arrayReducer,
        canvas: canvasReducer,
        document: documentReducer,
        [beranavizApi.reducerPath]: beranavizApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(beranavizApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const { selectById: selectNodeById, selectAll: selectAllNodes } =
    nodesAdapter.getSelectors((state: RootState) => state.nodes);

type DispatchFunc = () => AppDispatch;
export const useAppDispatch: DispatchFunc = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
