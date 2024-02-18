import {createAsyncThunk} from '@reduxjs/toolkit';

export const createAppAsyncThunk = (name, fn) => {
    return createAsyncThunk(name, async (args, thunkAPI) => {
        try {
            return await fn(args, thunkAPI);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    });
}