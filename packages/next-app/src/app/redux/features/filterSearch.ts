
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SearchProductDto, TagsDetailInp } from "@/lib/dtos/product/"
import { Perfume } from '@/types'


type InitialState = {
    value: SearchProductDto,
    perfumes: Perfume[],
    maxValue?: number
}

const initialState: InitialState = {
    value: {
        index: 1,
        count: 24,
        sort: "created_at_desc"
    },
    perfumes: [],
    maxValue: 1
}

export const filterSearch = createSlice({
    name: 'filterSearch',
    initialState,
    reducers: {
        UpdateFilter: (state, action: PayloadAction<{ value: SearchProductDto}>) => {
            state.value = action.payload.value;
        },
        UpdateMaxValue: (state, action: PayloadAction<{ maxValue: number }>) => {
            state.maxValue = action.payload.maxValue;
        },
        UpdatePerfume: (state, action: PayloadAction<{ value: Perfume[] }>) => {
            state.perfumes = action.payload.value;
        }
    }
})

export const { UpdateFilter, UpdatePerfume, UpdateMaxValue } = filterSearch.actions;

export default filterSearch.reducer;