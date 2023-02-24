import { createSlice } from '@reduxjs/toolkit';
import { DSAType } from '../../types';

interface CanvasState {
    dsaType: DSAType;
    animRunning: boolean;
}

const initialState: CanvasState = {
    dsaType: DSAType.ARRAY,
    animRunning: false,
};

const canvasSlice = createSlice({
    name: 'canvas',
    initialState,
    reducers: {
        dsaChanged(state, action) {
            state.dsaType = action.payload;
        },
        animRunningChanged(state, action) {
            state.animRunning = action.payload;
        },
    },
});

export const { dsaChanged, animRunningChanged } = canvasSlice.actions;
export default canvasSlice.reducer;
