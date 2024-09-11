import { configureStore } from '@reduxjs/toolkit'
import FAQRedux from './features/FAG.redux'
import filterSearch from './features/filterSearch'

export const makeStore = () => {
    return configureStore({
        reducer: {
            FAQRedux,
            filterSearch
        }
    })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']