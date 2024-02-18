import {createAsyncThunk} from '@reduxjs/toolkit';

import { getLikes,addLike } from './fetchLikes';

export const fetchLikes = createAsyncThunk(
    'likes/fetchLikes',
    async ({date,location}) => {
        const response = await getLikes(date,location);

        return response;
    }
);

export const addLikeAsync = createAsyncThunk(
    'likes/addLike',
    async ({date,location}) => {
        const response = await addLike(date,location);
        return response;
    }
);
