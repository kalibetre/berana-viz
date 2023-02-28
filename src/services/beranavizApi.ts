import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { firebaseAuth } from '../auth/firebase';
import { Document } from '../types';

export const beranavizApi = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_API_URL,
        prepareHeaders: async (headers) => {
            const token = await firebaseAuth.currentUser?.getIdToken();
            if (token) {
                headers.set('Authorization', `Token ${token}`);
            }
        },
    }),
    tagTypes: ['Documents'],
    endpoints: (builder) => ({
        getDocuments: builder.query({
            query: () => `documents`,
            providesTags: (result) =>
                result
                    ? [
                          ...result.map(
                              ({ uid }: { uid: string }) =>
                                  ({ type: 'Documents', id: uid } as const)
                          ),
                          { type: 'Documents', id: 'LIST' },
                      ]
                    : [{ type: 'Documents', id: 'LIST' }],
        }),
        createDocument: builder.mutation<
            Document,
            Partial<Document> & Pick<Document, 'uid'>
        >({
            query: (data: Document) => ({
                url: `documents/`,
                method: 'POST',
                body: data,
            }),
            invalidatesTags: [{ type: 'Documents', id: 'LIST' }],
        }),
        saveDocument: builder.mutation<
            Document,
            Partial<Document> & Pick<Document, 'uid'>
        >({
            query: ({ uid, ...patch }) => ({
                url: `documents/${uid}/`,
                method: 'PATCH',
                body: patch,
            }),
            invalidatesTags: (result, error, { uid }) => [
                { type: 'Documents', id: uid },
            ],
        }),
        deleteDocument: builder.mutation<
            { success: boolean; uid: string },
            string
        >({
            query: (uid) => ({
                url: `documents/${uid}`,
                method: 'DELETE',
            }),
            invalidatesTags: (result, error, uid) => [
                { type: 'Documents', id: uid },
            ],
        }),
    }),
});

export const {
    useLazyGetDocumentsQuery,
    useGetDocumentsQuery,
    useCreateDocumentMutation,
    useDeleteDocumentMutation,
    useSaveDocumentMutation,
} = beranavizApi;
