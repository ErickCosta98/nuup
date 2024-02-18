
import { configureStore } from '@reduxjs/toolkit';

import {useSelector as useReduxSelector,
    useDispatch as useReduxDispatch
} from 'react-redux';


import { reducer } from './rootReducer';

export const reduxStore = configureStore({
    reducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    }),
});

export const useSelector = useReduxSelector;
export const useDispatch = () => useReduxDispatch();







