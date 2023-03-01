import { createSlice } from '@reduxjs/toolkit';
import { Document } from '../../types';

interface DocumentState {
    isSample: boolean;
    selectedDocument: Document | null;
}

const generateSampleNodes = (count = 20) => {
    const nodes: number[] = [];
    for (let i = 0; i < count; i++)
        nodes.push(Math.round(Math.random() * 1000));
    return nodes;
};

const initialState: DocumentState = {
    isSample: true,
    selectedDocument: {
        title: 'Sample Document',
        description: '',
        content: { nodes: generateSampleNodes() },
    },
};

const documentSlice = createSlice({
    name: 'canvas',
    initialState,
    reducers: {
        documentSelected(state, action) {
            state.isSample = false;
            state.selectedDocument = action.payload;
        },
    },
});

export const { documentSelected } = documentSlice.actions;
export default documentSlice.reducer;
