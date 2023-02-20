import { createSlice } from '@reduxjs/toolkit';
import { DSAType } from '../../types';

interface CanvasState {
    dsaType: DSAType;
}

const initialState: CanvasState = {
    dsaType: DSAType.ARRAY,
};

const canvasSlice = createSlice({
    name: 'canvas',
    initialState,
    reducers: {
        dsaChanged(state, action) {
            state.dsaType = action.payload;
        },
    },
});

export const { dsaChanged } = canvasSlice.actions;
export default canvasSlice.reducer;
