import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState { 
    token: string | null;
    isAuthenticated: boolean;
}

const initialState: AuthState = {
    token: null,
    isAuthenticated: false,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuth(state, action: PayloadAction<{ token: string }>) {
            state.token = action.payload.token;
            state.isAuthenticated = true;
        },
        logout(state) {
            state.token = null;
            state.isAuthenticated = false;
        },
    },
});

export const { setAuth, logout } = authSlice.actions;
export default authSlice.reducer;