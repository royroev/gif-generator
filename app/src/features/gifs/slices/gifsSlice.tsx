import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { GetRandomGifByCategoryQuery } from '../../../graphql/autogenerate/schemas'
import { fetchCategories, fetchRandomGifByCategory } from '../thunks'
import { Gif, Category, Status } from '../types'

interface GifsState {
    selectedCategory: Category | null
    categories: Category[]
    totalCategories: number
    categoriesStatus: Status
    categoriesError: string | null
    randomGif: NonNullable<GetRandomGifByCategoryQuery['gifs']>[0] | null
    gifStatus: Status
    gifError: string | null
}

const initialState: GifsState = {
    selectedCategory: null,
    categories: [],
    totalCategories: 0,
    categoriesStatus: Status.IDLE,
    categoriesError: null,
    randomGif: null,
    gifStatus: Status.IDLE,
    gifError: null,
}

export const gifsSlice = createSlice({
    name: 'gifs',
    initialState,
    reducers: {
        setSelectedCategory(state: GifsState, action: PayloadAction<Category>) {
            state.selectedCategory = action.payload
            state.randomGif = null
            state.gifStatus = Status.IDLE
            state.gifError = null
        },
        clearSelectedCategory(state: GifsState) {
            state.selectedCategory = null
            state.randomGif = null
            state.gifStatus = Status.IDLE
            state.gifError = null
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCategories.pending, (state) => {
                state.categoriesStatus = Status.LOADING
                state.categoriesError = null
            })
            .addCase(
                fetchCategories.fulfilled,
                (state, action: PayloadAction<{ categories: Category[]; total: number }>) => {
                    state.categoriesStatus = Status.SUCCEEDED
                    state.categories = action.payload.categories
                    state.totalCategories = action.payload.total
                },
            )
            .addCase(fetchCategories.rejected, (state, action: PayloadAction<unknown>) => {
                state.categoriesStatus = Status.FAILED
                state.categoriesError = action.payload as string
            })

        builder
            .addCase(fetchRandomGifByCategory.pending, (state) => {
                state.gifStatus = Status.LOADING
                state.gifError = null
            })
            .addCase(fetchRandomGifByCategory.fulfilled, (state, action: PayloadAction<Gif | null>) => {
                state.gifStatus = Status.SUCCEEDED
                state.randomGif = action.payload
            })
            .addCase(fetchRandomGifByCategory.rejected, (state, action: PayloadAction<unknown>) => {
                state.gifStatus = Status.FAILED
                state.gifError = action.payload as string
            })
    },
})

export const { setSelectedCategory, clearSelectedCategory } = gifsSlice.actions

export default gifsSlice.reducer
