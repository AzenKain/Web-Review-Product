
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserType } from '@/types'


type InitialState = {
    userEditId: string | null,
    userEdit: UserType | null
}

const initialState: InitialState = {
    userEditId : null,
    userEdit : null
}

export const UserData = createSlice({
    name: 'UserData',
    initialState,
    reducers: {
        UpdateUserEditId: (state, action: PayloadAction<string| null>) => {
            state.userEditId = action.payload;
        },
        UpdateUserEdit: (state, action: PayloadAction<UserType| null>) => {
            state.userEdit = action.payload;
        },
    }
})

export const {UpdateUserEditId, UpdateUserEdit} = UserData.actions;

export default UserData.reducer;