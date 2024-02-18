import {createSlice  } from '@reduxjs/toolkit';

import { fetchLikes,addLikeAsync } from './thunks';

const initialState = {
    likes: 0,
    status: 'idle',
    error: null
};

const likesSlice = createSlice({
    name: 'likes',
    initialState,
    reducers: {
        likeAdded(state, action) {
            state.likes += 1;
        },
        likeRemoved(state, action) {
            state.likes -= 1;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchLikes.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchLikes.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.likes = action.payload;
            })
            .addCase(fetchLikes.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(addLikeAsync.fulfilled, (state, action) => {
                state.likes = action.payload;
            })
            .addCase(addLikeAsync.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    }
});

export {likesSlice};

