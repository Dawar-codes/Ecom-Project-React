import { createSlice, configureStore } from "@reduxjs/toolkit";

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
})

export const modalActions = modalSlice.actions;

const store = configureStore({
    reducer: { modal: modalSlice.reducer }
})
export default store;