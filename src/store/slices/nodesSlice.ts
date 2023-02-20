import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { Node } from '../../types';

enum LoadingStatus {
    LOADING,
    IDLE,
    ERROR,
}

export const nodesAdapter = createEntityAdapter({
    selectId: (node: Node) => node.id,
});

const nodesSlice = createSlice({
    name: 'nodes',
    initialState: nodesAdapter.getInitialState({
        status: LoadingStatus.IDLE,
        selectedId: '',
    }),
    reducers: {
        nodeAdded: nodesAdapter.addOne,
        nodeRemoved: nodesAdapter.removeOne,
        nodeUpdated: nodesAdapter.updateOne,
        nodeDeleted: nodesAdapter.removeOne,
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
} = nodesSlice.actions;
export default nodesSlice.reducer;
