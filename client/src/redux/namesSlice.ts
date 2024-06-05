import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface NameState { 
    names: string[];
}

const initialState: NameState = {
    names: [],
};

const namesSlice = createSlice({
    name: 'names',
    initialState,
    reducers: {
        setNames(state, action: PayloadAction<string[]>) {
            state.names = action.payload;
        },
    },
});

export const { setNames } = namesSlice.actions;
export default namesSlice.reducer;