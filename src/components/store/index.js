import { createSlice, configureStore } from "@reduxjs/toolkit";

const modalSlice = createSlice({
    name: 'modal',
    initialState: { open: false },
    reducers: {
        toggle(state) {
            state.open = !state.open;
        }
    }
})

export const modalActions = modalSlice.actions;

const store = configureStore({
    reducer: { modal: modalSlice.reducer }
})
export default store;