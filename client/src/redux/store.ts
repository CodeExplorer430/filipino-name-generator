import { configureStore } from '@reduxjs/toolkit';
import namesReducer from './namesSlice';
import authReducer from './authSlice';

const store = configureStore({
    reducer: {
        names: namesReducer,
        auth: authReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;