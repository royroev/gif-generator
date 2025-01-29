import { gql } from '@apollo/client'

export const GET_RANDOM_GIF_BY_CATEGORY_COUNT = gql`
    query GetGifsCountByCategory($categoryId: Int!) {
        gifs_aggregate(where: { category_id: { _eq: $categoryId } }) {
            aggregate {
                count
            }
        }
    }
`

export const GET_RANDOM_GIF_BY_CATEGORY_QUERY = gql`
    query GetRandomGifByCategory($categoryId: Int!, $limit: Int!, $offset: Int!) {
        gifs(where: { category_id: { _eq: $categoryId } }, limit: $limit, offset: $offset) {
            id
            url
            category_id
        }
    }
`
