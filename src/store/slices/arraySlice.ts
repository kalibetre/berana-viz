import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';

export interface Node {
    id: string;
    value: number;
}

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
    initialState: arrayAdapter.getInitialState({ status: LoadingStatus.IDLE }),
    reducers: {
        nodeAdded: arrayAdapter.addOne,
        nodeRemoved: arrayAdapter.removeOne,
    },
});

export const { nodeAdded, nodeRemoved } = arraySlice.actions;
export default arraySlice.reducer;
