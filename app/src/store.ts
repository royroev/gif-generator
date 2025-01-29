import { configureStore } from '@reduxjs/toolkit'

import gifsReducer from './features/gifs/slices/gifsSlice'

const store = configureStore({
    reducer: {
        gifs: gifsReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
