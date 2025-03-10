import { createSlice } from "@reduxjs/toolkit";



const modalSlice = createSlice({
    name: 'modal',
    initialState: { open: false },
    reducers: {
        handleOpen(state) {
            state.open = true;
        },
        handleClose(state) {
            state.open = false;
        }
    }
});

export const modalActions = modalSlice.actions;

export default modalSlice.reducer;