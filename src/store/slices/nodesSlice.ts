import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { Node } from '../../types';

enum LoadingStatus {
    LOADING,
    IDLE,
    ERROR,
}

export const nodesAdapter = createEntityAdapter({
    selectId: (node: Node) => node.id,
    sortComparer: (a: Node, b: Node) => a.time - b.time,
});

const nodesSlice = createSlice({
    name: 'nodes',
    initialState: nodesAdapter.getInitialState({
        status: LoadingStatus.IDLE,
        selectedId: '',
    }),
    reducers: {
        nodeAdded: nodesAdapter.addOne,
        nodesLoaded: nodesAdapter.setAll,
        nodeRemoved: nodesAdapter.removeOne,
        nodeUpdated: nodesAdapter.updateOne,
        nodesUpdated: nodesAdapter.updateMany,
        nodeDeleted: nodesAdapter.removeOne,
        nodeDeleteAll: nodesAdapter.removeAll,
        nodeSelected(state, action) {
            state.selectedId = action.payload;
        },
    },
});

export const {
    nodeAdded,
    nodesLoaded,
    nodeRemoved,
    nodeUpdated,
    nodesUpdated,
    nodeDeleted,
    nodeSelected,
    nodeDeleteAll,
} = nodesSlice.actions;
export default nodesSlice.reducer;
