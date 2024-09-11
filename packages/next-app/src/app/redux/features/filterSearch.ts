
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SearchProductDto, TagsDetailInp } from "@/lib/dtos/product/"
import { Perfume } from '@/types'


type InitialState = {
    value: SearchProductDto,
    perfumes: Perfume[]
}

const initialState: InitialState = {
    value: {
        index: 1,
        count: 24
    },
    perfumes: []
}

export const filterSearch = createSlice({
    name: 'filterSearch',
    initialState,
    reducers: {
        UpdateFilter: (state, action: PayloadAction<{ value: SearchProductDto }>) => {
            state.value = action.payload.value;
        },
        UpdatePerfume: (state, action: PayloadAction<{ value: Perfume[] }>) => {
            state.perfumes = action.payload.value;
        }
    }
})

export const { UpdateFilter, UpdatePerfume } = filterSearch.actions;

export default filterSearch.reducer;