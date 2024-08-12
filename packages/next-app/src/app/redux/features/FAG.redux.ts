
import { FAQ } from '@/types/Template';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type InitialState = {
    value: FAQ,
    other: string
}

const initialState: InitialState = {
    value: {
        header: "#",
        id: 1234,
        text: "super-text"
    } ,
    other: 'none' 
}

export const FAQRedux = createSlice({
    name: 'FAQRedux',
    initialState,
    reducers: {
        UpdateFAQ: (state, action: PayloadAction<{value: FAQ; other: string}>) => {
            state.value = action.payload.value;
            state.other = action.payload.other;
        },

    }
})

export const { UpdateFAQ } = FAQRedux.actions;

export default FAQRedux.reducer;