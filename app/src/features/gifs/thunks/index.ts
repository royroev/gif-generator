import { createAsyncThunk } from '@reduxjs/toolkit'

import client from '../../../graphql/apolloClient'
import {
    GetCategoriesQuery,
    GetCategoriesQueryVariables,
    GetGifsCountByCategoryQuery,
    GetGifsCountByCategoryQueryVariables,
    GetRandomGifByCategoryQuery,
    GetRandomGifByCategoryQueryVariables,
} from '../../../graphql/autogenerate/schemas'
import {
    GET_CATEGORIES,
    GET_RANDOM_GIF_BY_CATEGORY_COUNT,
    GET_RANDOM_GIF_BY_CATEGORY_QUERY,
} from '../../../graphql/queries'
import { Category } from '../types'

export const fetchCategories = createAsyncThunk<{ categories: Category[]; total: number }, GetCategoriesQueryVariables>(
    'gifs/fetchCategories',
    async (variables: GetCategoriesQueryVariables, { rejectWithValue }) => {
        try {
            const { limit, offset, searchTerm } = variables
            const { data } = await client.query<GetCategoriesQuery, GetCategoriesQueryVariables>({
                query: GET_CATEGORIES,
                variables: {
                    limit,
                    offset,
                    searchTerm: `%${searchTerm}%`,
                },
                fetchPolicy: 'network-only',
            })
            return {
                categories: data.categories,
                total: data.categories_aggregate.aggregate?.count || 0,
            }
        } catch (error) {
            return rejectWithValue(error)
        }
    },
)

export const fetchRandomGifByCategory = createAsyncThunk<
    NonNullable<GetRandomGifByCategoryQuery['gifs']>[0] | null,
    GetGifsCountByCategoryQueryVariables
>('gifs/fetchRandomGifByCategory', async (variables: GetGifsCountByCategoryQueryVariables, { rejectWithValue }) => {
    const { categoryId } = variables
    try {
        const { data: countData } = await client.query<
            GetGifsCountByCategoryQuery,
            GetGifsCountByCategoryQueryVariables
        >({
            query: GET_RANDOM_GIF_BY_CATEGORY_COUNT,
            variables: { categoryId },
            fetchPolicy: 'network-only',
        })

        const totalGifs = countData.gifs_aggregate.aggregate?.count || 0

        if (totalGifs === 0) {
            return null
        }

        const randomOffset = Math.floor(Math.random() * totalGifs)

        const { data: gifData } = await client.query<GetRandomGifByCategoryQuery, GetRandomGifByCategoryQueryVariables>(
            {
                query: GET_RANDOM_GIF_BY_CATEGORY_QUERY,
                variables: {
                    categoryId,
                    limit: 1,
                    offset: randomOffset,
                },
                fetchPolicy: 'network-only',
            },
        )

        const gif = gifData.gifs[0]

        return gif
    } catch (error) {
        return rejectWithValue('error')
    }
})
