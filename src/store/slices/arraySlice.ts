import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { Node } from '../../types';

enum LoadingStatus {
    LOADING,
    IDLE,
    ERROR,
}

export const arrayAdapter = createEntityAdapter({
    selectId: (node: Node) => node.id,
});

const arraySlice = createSlice({
    name: 'array',
    initialState: arrayAdapter.getInitialState({
        status: LoadingStatus.IDLE,
        selectedId: '',
    }),
    reducers: {
        nodeAdded: arrayAdapter.addOne,
        nodeRemoved: arrayAdapter.removeOne,
        nodeUpdated: arrayAdapter.updateOne,
        nodeDeleted: arrayAdapter.removeOne,
        nodeSelected(state, action) {
            state.selectedId = action.payload;
        },
    },
});

export const {
    nodeAdded,
    nodeRemoved,
    nodeUpdated,
    nodeDeleted,
    nodeSelected,
} = arraySlice.actions;
export default arraySlice.reducer;
